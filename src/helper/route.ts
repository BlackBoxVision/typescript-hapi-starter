import * as Hapi from 'hapi';

interface IRoute {
    register(server: Hapi.Server): Promise<any>;
}

export default IRoute;
