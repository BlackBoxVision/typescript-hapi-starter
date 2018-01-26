export const DataStores = {
    NedbFactory: Symbol('Factory<INedbDatastore'),
    NedbDataStore: Symbol('NedbDataStore'),
    NedbUserDataStore: Symbol('NedbUserDataStore'),
    NedbArticleDataStore: Symbol('NedbArticleDataStore'),
};

// Controllers defined in the container
export const Controllers = {
    UsersController: Symbol('UsersController'),
    ArticlesController: Symbol('ArticlesController'),
};

// Factories defined in the container
export const Factories = {
    ServerFactory: Symbol('ServerFactory'),
};

// App Plugins defined in the container
export const Plugins = {
    Plugin: Symbol('Plugin'),
    Status: Symbol('Status'),
    Swagger: Symbol('Swagger'),
    Boom: Symbol('Boom'),
};

// Repositories defined in the container
export const Repositories = {
    BaseRepository: Symbol('BaseRepository'),
    UserRepository: Symbol('UserRepository'),
    ArticleRepository: Symbol('ArticleRepository'),
};

// Resolvers defined in the container
export const Resolvers = {
    UserResolver: Symbol('UsersResolver'),
    ArticleResolver: Symbol('ArticleResolver'),
};

// Route type defined in the container
export const Routes = {
    Route: Symbol('Route'),
};

// App Services defined in the container
export const Services = {
    Container: Symbol('Container'),
    Config: Symbol('Config'),
    Logger: Symbol('Logger'),
};

export default {
    Controllers,
    DataStores,
    Factories,
    Plugins,
    Repositories,
    Resolvers,
    Routes,
    Services,
};
