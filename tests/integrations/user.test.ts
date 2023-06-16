import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '@/app.ts';
import { cleanDb } from '../helpers/cleandDb.ts';
import { createUser } from '../factories/userFactory.ts';

const server = supertest(app);

beforeEach(async () => {
    cleanDb();
})

describe('GET /users', () => {
    it('should respond with status 200 and the list of users', async () => {
        const user1 = await createUser("Ricardo");
        const user2 = await createUser("Alberto");

        const response = await server.get('/users');

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toStrictEqual([
            {
                id: user1.id,
                name: user1.name,
                job: user1.job
            },
            {
                id: user2.id,
                name: user2.name,
                job: user2.job
            }
        ])
    })
})

describe('GET /user', () => {
    describe('When the user information is invalid:', () => {
        it('should respond with status 404', async () => {
            const user1 = createUser("Ricardo");
            const user2 = createUser("Alberto");

            const response = await server.get('/user?name=Claudio');

            expect(response.status).toBe(404);
        })
    })

    describe('When the user information is valid:', () => {
        it('should respond with status 200 and the user', async () => {
            const user1 = await createUser("Ricardo");
            const user2 = await createUser("Alberto");

            const response = await server.get('/user?name=Ricardo');

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toStrictEqual(
                {
                    id: user1.id - 1,
                    name: user1.name,
                    job: user1.job
                }
            );
        })
    })
})

describe('POST /users', () => {
    describe('When the body is invalid:', () => {
        it('should respond with status 404', async () => {
            const invalidBody = {}
            const response = await server.post('/users').send(invalidBody);

            expect(response.status).toBe(400);
        })
    })

    describe('When the body is valid:', () => {

        describe('When the name is already in use', () => {
            it('should respond with status 409 and the user', async () => {
                const user1 = await createUser("Ricardo");
                const body = {
                    name: "Ricardo",
                    job: "Dev",
                }
                const response = await server.post('/users').send(body);

                expect(response.status).toBe(httpStatus.CONFLICT);
            })
        });

        describe('When the name is valid', () => {
            it('should respond with status 200 and the user', async () => {
                const body = {
                    name: "Ricardo",
                    job: "Dev",
                }
                const response = await server.post('/users').send(body);

                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toStrictEqual(
                    {
                        id: 1,
                        name: "Ricardo",
                        job: "Dev"
                    }
                )
            })
        })
    })
})

describe('DELETE /users', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoxfSwiaWF0IjoxNjg2OTI1NDk5fQ.2LWm8PryPihocp1ycJlzbsc6XsHVEhEmOuRpWsuu_v0';
    describe('When the user does not provide a auth token:', () => {
        it('should respond with status 401', async () => {
            const user1 = await createUser("Ricardo");
            const response = await server.delete('/users?name=Ricardo');

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        })
    })

    describe('When the auth token is valid:', () => {
        describe('When the name is not in use', () => {
            it('should respond with status 404 and the user', async () => {
                const user1 = await createUser("Ricardo");
                const response = await server.delete('/users?name=Daniel').set('Authorization', `Bearer ${token}`);

                expect(response.status).toBe(httpStatus.NOT_FOUND);
            })
        });

        describe('When the name is valid', () => {
            it('should respond with status 200 and the deleted user', async () => {
                const user1 = await createUser('Ricardo')
                const response = await server.delete('/users?name=Ricardo').set('Authorization', `Bearer ${token}`);

                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toStrictEqual(
                    {
                        id: 1,
                        name: "Ricardo",
                        job: "Dev"
                    }
                )
            })
        })
    })
})