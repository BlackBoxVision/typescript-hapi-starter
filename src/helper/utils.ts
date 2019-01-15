import * as Hapi from 'hapi';

export default class Utils {
    public static getUrl(request: Hapi.Request): string {
        return `${request.server.info.protocol}://${process.env.HOST}:${process.env.PORT}${request.url.path}`;
    }
}
