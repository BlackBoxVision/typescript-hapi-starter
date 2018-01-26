import { interfaces } from 'inversify';
import { IServerRegisterable } from '../interfaces';
import Boom from '../plugin/boom';
import Status from '../plugin/status';
import Swagger from '../plugin/swagger';
import Good from '../plugin/good';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Status);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Swagger);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Boom);
    c.bind<IServerRegisterable>(Types.Plugins.Plugin).to(Good);
};
