import { injectable } from 'inversify';
import BasePlugin from './base-plugin';

@injectable()
class Boom extends BasePlugin {
    protected configurePlugin(): any {
        return {
            register: require('hapi-boom-decorators'),
        };
    }
}

export default Boom;
