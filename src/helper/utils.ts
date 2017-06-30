import * as Hapi from 'hapi';

export default class Utils {
    static getUrl(request: Hapi.Request): string {
        return `${request.connection.info.protocol}://${process.env.HOST}:${process.env
            .PORT}${request.url.path}`;
    }
}
