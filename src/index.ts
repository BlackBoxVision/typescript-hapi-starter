import Server from './server';
import Logger from './helper/logger';

(async () => {
    await Server.start();
})();

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', () => {
    Logger.info('Stopping hapi server');

    Server.stop().then(err => {
        Logger.info(`Server stopped`);
        process.exit(err ? 1 : 0);
    });
});
