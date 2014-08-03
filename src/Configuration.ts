/// <reference path="TypeFramework.ts" />

module TF {
    export class Configuration {
        private data: {} = {};

        constructor(private appRoot: string) {}

        addJson(filePath: string) {
            filePath = path.join(this.appRoot, filePath);
            if (!fs.existsSync(filePath)) {
                console.log('Config ' + path + ' is not found!');
                return;
            }

            var config = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
            this.readConfig('', config);
        }

        get(key: string): any {
            var keyParts = key.split('.');
            return _.reduce(keyParts, (data, key) => !!data ? data[key] : undefined, this.data)
        }

        set(key: string, value: any) {
            var keyParts = key.split('.');
            var data = this.data;
            _.forEach(keyParts, (key) => {
                if (key == _.last(keyParts))
                    data[key] = value;
                else
                    data[key] = typeof data[key] == 'object' ? data[key] : {};

                data = data[key];
            });
        }

        private readConfig(path, config) {
            Object.getOwnPropertyNames(config).forEach((key) => {
                var newKey = path + (!!path ? '.' : '') + key;
                if (typeof config[key] == 'object')
                    this.readConfig(newKey, config[key]);
                else
                    this.set(newKey, config[key]);
            });
        }
    }
}