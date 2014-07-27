/// <reference path="TypeFramework.ts" />

module TF {
    export interface INoResultCallback<T> { (err: Error); }
    export interface ISingleResultCallback<T> { (err: Error, model: T); }
    export interface IMultipleResultCallback<T> { (err: Error, models: T[]); }

    export class DbQuery<T> {
        constructor(private wQuery: WL.IQuery) {}
        where(query: {}): DbQuery<T> {
            this.wQuery.where(query);
            return this;
        }
        order(query: string): DbQuery<T> {
            this.wQuery.sort(query);
            return this;
        }
        skip(count: number): DbQuery<T> {
            this.wQuery.skip(count);
            return this;
        }
        limit(count: number): DbQuery<T> {
            this.wQuery.limit(count);
            return this;
        }
        done(callback: IMultipleResultCallback<T>) {
            this.wQuery.done((err, models: T[]) => {
                callback(err, models);
            });
        }
    }

    export class DbQueryEnd<T> {
        constructor(private query: DbQuery<T>) {}
        done(callback: IMultipleResultCallback<T>) {
            this.query.done((err, result) => callback(err, result));
        }
    }

    export class DbQueryUnique<T> {
        constructor(private wQuery: WL.Result<WL.SingleResult>) {}
        done(callback: ISingleResultCallback<T>) {
            this.wQuery.done((err, model) => {
                if (!err && !!model) {
                    model['$save'] = model['save'];
                    model['$destroy'] = model['destroy'];
                }
                callback(err, model);
            });
        }
    }

    export class DbQueryRaw<T> {
        constructor(private wQuery: WL.Result<WL.SingleResult>) {}
        done(callback: ISingleResultCallback<T>) {
            this.wQuery.done((err, result) => callback(err, result));
        }
    }

    export class Model {
        public id: number;
        public createdAt: Date;
        public updatedAt: Date;

        public static collectionName: string;
        public static schema = true;
        public static adapter = 'default';
        public static attributes = {};

        save<T>(callback: ISingleResultCallback<T>) {
            if (!this['$save'])
                Model.collection(this).create(this).done((err, newModel: T) => {
                    var model = Model.extend(newModel, this);
                    model['$save'] = model['save'];
                    model['$destroy'] = model['destroy'];
                    callback(err, model);
                });
            else {
                this['$save'].done((err) => callback(err, null));
            }
        }

        destroy<T>(callback: INoResultCallback<T>) {
            if (!this['$destroy'])
                throw new Error('model not found');

            this['$destroy'].done((err) => callback(err));
        }

        static all<T>(): DbQueryEnd<T> {
            var query = Model.find.apply(this);
            return new DbQueryEnd<T>(query);
        }

        static where(query: {}) {
            return Model.collection(this).find().where(query);
        }

        static get(id: number): DbQueryUnique<any> {
            var wQuery = Model.collection(this).findOne({id: id});
            return new DbQueryUnique<any>(wQuery);
        }

        static first<T>(query: {}): DbQueryUnique<T> {
            var wQuery = Model.collection(this).findOne(query);
            return new DbQueryUnique<T>(wQuery);
        }

        static find<T>(): DbQuery<T> {
            var query = Model.collection(this).find();
            return new DbQuery<T>(query);
        }

        static query<T>(query: string): DbQueryRaw<T> {
            var wQuery = Model.collection(this).query(query);
            return new DbQueryRaw<T>(wQuery);
        }

        static validate(attr: string, options: ModelValidation);
        static validate(attrs: string[], definition: ModelValidation);
        static validate(obj: any, definition: ModelValidation) {
            if (typeof obj == 'string') {
                this.attributes[obj] = definition;
            }
            else if (obj instanceof Array) {
                obj.forEach((attr) => {
                    Model.validate(attr, definition);
                })
            }
        }

        private static collection(obj: any) {
            var prototype = typeof obj == 'function' ? 'prototype' : '__proto__';
            return TF.collections[obj[prototype]['constructor']['name']];
        }

        private static extend(from, to) {
            for (var name in from)
                if (from.hasOwnProperty(name) && typeof from[name] != 'function')
                    to[name] = from[name];

            return to;
        }
    }

    export interface ModelValidation {
        type?: string;
        defaultsTo?: any;
        empty?: boolean;
        required?: boolean;
        notEmpty?: boolean;
        undefined?: boolean;
        string?: boolean;
        alpha?: boolean;
        numeric?: boolean;
        alphanumeric?: boolean;
        email?: boolean;
        url?: boolean;
        urlish?: boolean;
        ip?: boolean;
        ipv4?: boolean;
        ipv6?: boolean;
        creditcard?: boolean;
        uuid?: boolean;
        uuidv3?: boolean;
        uuidv4?: boolean;
        int?: boolean;
        integer?: boolean;
        number?: boolean;
        finite?: boolean;
        decimal?: boolean;
        float?: boolean;
        falsey?: boolean;
        truthy?: boolean;
        null?: boolean;
        notNull?: boolean;
        boolean?: boolean;
        array?: boolean;
        date?: boolean;
        hexadecimal?: boolean;
        hexColor?: boolean;
        lowercase?: boolean;
        uppercase?: boolean;
        after?: any;
        before?: any;
        regex?: string;
        notRegex?: string;
        equals?: any
        contains?: any;
        notContains?: any;
        len?: {};
        in?: any[];
        notIn?: any[];
        max?: number;
        min?: number;
        minLength?: number;
        maxLength?: number;
    }
}