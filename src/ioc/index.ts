import { Container } from 'inversify';
import controllers from './controllers';
import datastores from './datastore';
import factories from './factories';
import services from './services';
import plugins from './plugins';
import repositories from './repositories';
import resolvers from './resolvers';
import router from './router';

const container = new Container();

controllers(container);
datastores(container);
factories(container);
plugins(container);
repositories(container);
resolvers(container);
router(container);
services(container);

export default container;
