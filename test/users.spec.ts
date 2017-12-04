import { serverTest, extractPayload } from './helpers';

interface IUser {
    id?: string;
    age: number;
    name: string;
    lastName: string;
}

serverTest('[GET] /api/users should return 200 status', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/users',
    });

    const payload = extractPayload<IUser[]>(response);

    t.equals(response.statusCode, 200, 'Status code is 200');
    t.equals(payload.data.length, 0, 'Data is empty');
});

serverTest('[POST] /api/users should return 201', async (server, t) => {
    const response = await server.inject({
        method: 'POST',
        url: '/api/users',
        payload: {
            age: 33,
            name: 'John',
            lastName: 'Doe',
        }
    });

    const payload = extractPayload<IUser>(response);

    t.equal(response.statusCode, 200, 'Status is 200');
    t.assert(typeof payload.data.id === 'string', 'ID is a string');
});
