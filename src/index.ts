import * as DotEnv from 'dotenv';
import Server from './server';

DotEnv.config();
Server.start();
