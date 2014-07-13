/// <reference path="../TypeFramework.ts" />

module TF {
    export interface DeclarationItem {
        type: string
        name?: string
        optional?: boolean;
        keywords?: string[]
        parameters?: DeclarationItem[]
        return?: string
        extends?: string[]
        members?: DeclarationItem[];
    }

    export class Declaration {
        private items: DeclarationItem[];

        constructor(declarationPath: string) {
            var jison: any = require('jison');
            var typescript = fs.readFileSync(__dirname + '/../jison/typescript.jison', { encoding: 'utf8' });
            var declaration = fs.readFileSync(declarationPath, { encoding: 'utf8' });
            this.items = new jison.Parser(typescript).parse(declaration);
        }

        public getClass(name: string) {
            return this.getItem('class', name, this.items);
        }

        private getItem(type: string, name: string, items: DeclarationItem[]) {
            var items = _.filter<DeclarationItem>(items, (item: DeclarationItem) => item.type == type);
            var item = _.find<DeclarationItem>(items, (item: DeclarationItem) => item.name == name);
            return item || _.find<DeclarationItem>(items, (item: DeclarationItem) => this.getItem(type, name, item.members) )
        }
    }

    export class VariableInfo {
        name: string;
        type: string;
        optional: boolean = false;
    }

    export class MemberInfo extends VariableInfo {
        keywords: string[] = [];
        parameters: VariableInfo[] = [];
        getParam(name: string): VariableInfo {
            return _.find(this.parameters, (x: VariableInfo) => x.name == name);
        }
    }

    export class ControllerInfo {
        name: string;
        className: string;
        path: string;
        hasModel: boolean;
        baseClassName: string;
        actions: MemberInfo[];

        constructor(public type: any, declaration: Declaration) {
            this.className = type.prototype.constructor.name;
            this.name = this.className.replace('Controller', '').toLowerCase();
            this.path = '/' + this.name;
            this.hasModel = !!type.model;

            var definition = declaration.getClass(this.className);
            this.baseClassName = !!definition.extends && definition.extends.length > 0 ? definition.extends[0] : null;
            this.actions = _.map(definition.members || [], (x: DeclarationItem) => {
                var action = new MemberInfo();
                action.name = x.name;
                action.type = x.type;
                action.optional = Boolean(x.optional);
                action.keywords = x.keywords || [];
                action.parameters = _.map(x.parameters, (y: DeclarationItem) => {
                    var param = new VariableInfo();
                    param.name = y.name;
                    param.type = y.return;
                    param.optional = Boolean(y.optional);
                    return param;
                });
                return action;
            });

            var hasAction = function(name) { _.any(this.actions, (x: MemberInfo) => x.name == name) };
            if (this.hasModel) {
                var idParamOptional = new VariableInfo();
                idParamOptional.name = 'id';
                idParamOptional.optional = true;
                idParamOptional.type = 'string';

                var idParam = new VariableInfo();
                idParam.name = 'id';
                idParam.type = 'string';

                if (!hasAction('find')) {
                    var action = new MemberInfo();
                    action.name = 'find';
                    action.type = 'function';
                    action.parameters.push(idParamOptional);
                    this.actions.push(action);
                }
                if (!hasAction('create')) {
                    var action = new MemberInfo();
                    action.name = 'create';
                    action.type = 'function';
                    action.parameters.push(idParam);
                    this.actions.push(action);
                }
                if (!hasAction('update')) {
                    var action = new MemberInfo();
                    action.name = 'update';
                    action.type = 'function';
                    action.parameters.push(idParam);
                    this.actions.push(action);
                }
                if (!hasAction('destroy')) {
                    var action = new MemberInfo();
                    action.name = 'destroy';
                    action.type = 'function';
                    action.parameters.push(idParam);
                    this.actions.push(action);
                }
            }
        }

        getAction(name: string): MemberInfo {
            return _.find(this.actions, (x: MemberInfo) => x.name == name);
        }
    }

    export class ModelInfo {
        name: string;
        baseClassName: string;
        properties: MemberInfo[];

        constructor(public type: any, declaration: Declaration) {
            this.name = type.prototype.constructor.name;

            var modelDefinition = declaration.getClass(this.name);
            this.baseClassName = !!modelDefinition.extends && modelDefinition.extends.length > 0 ? modelDefinition.extends[0] : null;
            this.properties = _.chain(modelDefinition.members || [])
                .filter((x: DeclarationItem) => x.type == 'variable')
                .map((x: DeclarationItem) => {
                    var property = new MemberInfo();
                    property.name = x.name;
                    property.type = x.return;
                    property.optional = Boolean(x.optional);
                    property.keywords = x.keywords || [];
                    property.parameters = _.map(x.parameters, (y: DeclarationItem) => {
                        var param = new VariableInfo();
                        param.name = y.name;
                        param.type = y.return;
                        param.optional = Boolean(y.optional);
                        return param;
                    });
                    return property;
                })
                .filter((x: MemberInfo) => !_.contains(x.keywords, 'static') && !_.contains(x.keywords, 'private'))
                .value();
        }
    }
}