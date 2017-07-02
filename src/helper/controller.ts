import * as Hapi from 'hapi';

interface ICrudController {
    create(request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any>;

    updateById(request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any>;

    getById(request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any>;

    getAll(request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any>;

    deleteById(request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any>;
}

export default ICrudController;
