import * as DotEnv from 'dotenv';
import Server from './server';
import * as Hapi from 'hapi';

DotEnv.config();
Server.start();

export default Server.instance() as Hapi.Server;
