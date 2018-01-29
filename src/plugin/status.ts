import { injectable } from 'inversify';
import BasePlugin from 'app/plugin/base-plugin';

@injectable()
class Status extends BasePlugin {
    protected isDevOnly(): boolean {
        return true;
    }

    protected configurePlugin(): any {
        return {
            path: this.config.status.path,
            options: this.config.status.options,
            register: require('hapijs-status-monitor'),
        };
    }
}

export default Status;
