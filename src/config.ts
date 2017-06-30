export default {
    swagger: {
        options: {
            basePath: '/api/',
            info: {
                title: 'API Documentation',
                version: 'v1.0.0',
                contact: {
                    name: 'John doe',
                    email: 'johndoe@johndoe.com'
                }
            },
            grouping: 'tags',
            sortEndpoints: 'ordered'
        }
    },
    status: {
        options: {
            title: 'API Monitor',
            routeConfig: {
                auth: false
            }
        }
    }
};
