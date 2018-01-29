import { injectable } from 'inversify';
import BasePlugin from 'app/plugin/base-plugin';
import * as GoodWinston from 'good-winston';
import * as good from 'good';
import * as Winston from 'winston';

const goodWinstonStream = new GoodWinston({
    winston: Winston,
});

@injectable()
class Good extends BasePlugin {
    protected isDevOnly() {
        return true;
    }

    protected configurePlugin(): any {
        return {
            register: good,
            options: {
                reporters: {
                    winston: [goodWinstonStream],
                },
            },
        };
    }
}

export default Good;
