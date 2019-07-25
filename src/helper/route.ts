import * as Hapi from '@hapi/hapi';

interface IRoute {
  register(server: Hapi.Server): Promise<any>;
}

export default IRoute;
