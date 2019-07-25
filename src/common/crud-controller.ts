import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import CrudResolver from '../common/base-resolver';
import Logger from '../helper/logger';

export default class CrudController<T> {
  constructor(private crudResolver: CrudResolver<T>) {}

  public create = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      Logger.info(`POST - ${request.url.href}`);

      const data: any = await this.crudResolver.save(request.payload as any);

      return toolkit.response({
        meta: {
          method: request.method.toUpperCase(),
          operation: request.url.pathname,
          paging: null,
        },
        data: [
          {
            id: data['_id'],
          },
        ],
        errors: [],
      });
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public updateById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      Logger.info(`PUT - ${request.url.href}`);

      const id = encodeURIComponent(request.params.id);

      const entity: T = await this.crudResolver.updateOneById(
        id,
        request.payload
      );

      return toolkit.response({
        meta: {
          method: request.method.toUpperCase(),
          operation: request.url.pathname,
          paging: null,
        },
        data: entity ? [entity] : [],
        errors: [],
      });
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public getById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      Logger.info(`GET - ${request.url.href}`);

      const id = encodeURIComponent(request.params.id);

      const entity: T = await this.crudResolver.getOneById(id);

      return toolkit.response({
        meta: {
          method: request.method.toUpperCase(),
          operation: request.url.pathname,
          paging: null,
        },
        data: entity ? [entity] : [],
        errors: [],
      });
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public getAll = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      Logger.info(`GET - ${request.url.href}`);

      const entities: T[] = await this.crudResolver.getAll();

      return toolkit.response({
        meta: {
          method: request.method.toUpperCase(),
          operation: request.url.pathname,
          paging: null,
        },
        data: entities,
        errors: [],
      });
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public deleteById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      Logger.info(`DELETE - ${request.url.href}`);

      const id = encodeURIComponent(request.params.id);

      await this.crudResolver.deleteOneById(id);

      return toolkit.response({
        meta: {
          method: request.method.toUpperCase(),
          operation: request.url.pathname,
          paging: null,
        },
        data: [id],
        errors: [],
      });
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };
}
