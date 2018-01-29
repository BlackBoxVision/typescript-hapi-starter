import { interfaces } from 'inversify';
import ServerFactory from 'app/factories/server-factory';
import { IServerFactory } from 'app/interfaces';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<IServerFactory>(Types.Factories.ServerFactory).to(ServerFactory);
};
