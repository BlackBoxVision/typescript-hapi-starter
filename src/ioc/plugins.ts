import { interfaces } from 'inversify';
import { IServerRegisterable } from 'app/interfaces';
import Boom from 'app/plugin/boom';
import Status from 'app/plugin/status';
import Swagger from 'app/plugin/swagger';
import Good from 'app/plugin/good';
import Types from 'app/ioc/types';

export default (c: interfaces.Container): void => {
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Status);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Swagger);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Boom);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Good);
};
