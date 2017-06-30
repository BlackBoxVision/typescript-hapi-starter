import * as Hapi from 'hapi';
import * as Boom from 'boom';

import User from "../../model/user";
import Utils from '../../helper/utils';
import Logger from '../../helper/logger';
import Repository from "../../repository";

export default class UserController {
    static repository: Repository<User> = new Repository<User>();

    static async create(request: Hapi.Request, response: Hapi.ReplyNoContinue) : Promise<any> {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            const user = new User();

            user.id = String(Math.floor((Math.random() * 1500) + 1));
            user.age = request.payload.age;
            user.name = request.payload.name;
            user.lastName = request.payload.lastName;

            UserController.repository.save(user.id, user);

            return response({
                statusCode: 200,
                data: {
                    id: user.id
                }
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    }

    static async updateById(request: Hapi.Request, response: Hapi.ReplyNoContinue) : Promise<any> {
        try {
            Logger.info(`PUT - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            const user = UserController.repository.getById(id);

            if (!user) {
                return response(Boom.notFound('User not found'));
            }

            user.age = request.payload.age;
            user.name = request.payload.name;
            user.lastName = request.payload.lastName;

            UserController.repository.updateById(id, user);

            return response({
                statusCode: 200,
                data: user
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    }

    static async getById(request: Hapi.Request, response: Hapi.ReplyNoContinue) : Promise<any> {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            const user = UserController.repository.getById(id);

            if (!user) {
                return response(Boom.notFound('User not found'));
            }

            return response({
                statusCode: 200,
                data: user
            });
        } catch (error) {
            return response(Boom.notFound(error));
        }
    }

    static async getAll(request: Hapi.Request, response: Hapi.ReplyNoContinue) : Promise<any> {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const users = UserController.repository.getAll();

            return response({
                statusCode: 200,
                data: users
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    }

    static async deleteById(request: Hapi.Request, response: Hapi.ReplyNoContinue) : Promise<any> {
        try {
            Logger.info(`DELETE - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            UserController.repository.delete(id);

            return response({
                statusCode: 200,
                data: {
                    id: id
                }
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    }
}