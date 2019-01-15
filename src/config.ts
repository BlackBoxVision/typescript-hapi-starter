export default {
    swagger: {
        options: {
            jsonEditor: true,
            info: {
                title: 'API Documentation',
                version: 'v1.0.0',
                contact: {
                    name: 'John doe',
                    email: 'johndoe@johndoe.com',
                },
            },
            grouping: 'tags',
            sortEndpoints: 'ordered',
        },
    },
    status: {
        options: {
            path: '/status',
            title: 'API Monitor',
            routeConfig: {
                auth: false,
            },
        },
    },
};
