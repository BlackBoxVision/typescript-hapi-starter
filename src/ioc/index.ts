import { Container } from 'inversify';
import controllers from 'app/ioc/controllers';
import datastores from 'app/ioc/datastore';
import factories from 'app/ioc/factories';
import services from 'app/ioc/services';
import plugins from 'app/ioc/plugins';
import repositories from 'app/ioc/repositories';
import resolvers from 'app/ioc/resolvers';
import router from 'app/ioc/router';

const container = new Container();

// Load Services first for general availability
services(container);

router(container);
controllers(container);
datastores(container);
factories(container);
plugins(container);
repositories(container);
resolvers(container);

export default container;
