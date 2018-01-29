import BasePlugin from 'app/plugin/base-plugin';
import { injectable } from 'inversify';

@injectable()
class Boom extends BasePlugin {
    protected configurePlugin(): any {
        return {
            register: require('hapi-boom-decorators'),
        };
    }
}

export default Boom;
