import { injectable } from 'inversify';
import BasePlugin from 'app/plugin/base-plugin';

@injectable()
class Swagger extends BasePlugin {
    protected isDevOnly(): boolean {
        return true;
    }

    protected configurePlugin(): any {
        return [
            require('vision'),
            require('inert'),
            {
                options: this.config.swagger.options,
                register: require('hapi-swagger'),
            },
        ];
    }
}

export default Swagger;
