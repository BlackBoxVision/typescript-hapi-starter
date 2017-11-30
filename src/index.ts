// import * as DotEnv from 'dotenv';
import Server from './server';
import * as Hapi from 'hapi';

// DotEnv.config();
(async () => {
    await Server.start();
})();
