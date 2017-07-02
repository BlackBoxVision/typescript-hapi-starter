import * as Hapi from 'hapi';
import * as Boom from 'boom';

import User from '../../model/user';
import Utils from '../../helper/utils';
import Logger from '../../helper/logger';
import Repository from '../../repository';
import ICrudController from '../../helper/controller';

class UserController implements ICrudController {
    public repository: Repository<User> = new Repository<User>();

    public create = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            const user = new User();

            user.age = request.payload.age;
            user.name = request.payload.name;
            user.lastName = request.payload.last_name;

            const data = await this.repository.save(user);

            return response({
                statusCode: 200,
                data: {
                    id: data._id,
                },
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    };

    public updateById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`PUT - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            const user = await this.repository.getById(id);

            if (!user) {
                return response(Boom.notFound('User not found'));
            }

            user.age = request.payload.age;
            user.name = request.payload.name;
            user.lastName = request.payload.last_name;

            await this.repository.updateById(id, user);

            return response({
                statusCode: 200,
                data: user,
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    };

    public getById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            const user = await this.repository.getById(id);

            if (!user) {
                return response(Boom.notFound('User not found'));
            }

            return response({
                statusCode: 200,
                data: user,
            });
        } catch (error) {
            return response(Boom.notFound(error));
        }
    };

    public getAll = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const users = await this.repository.getAll();

            return response({
                statusCode: 200,
                data: users,
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    };

    public deleteById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`DELETE - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);
            await this.repository.delete(id);

            return response({
                statusCode: 200,
                data: { id },
            });
        } catch (error) {
            return response(Boom.badRequest(error));
        }
    };
}

export default new UserController();
