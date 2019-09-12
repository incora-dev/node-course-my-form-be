import * as request from 'supertest';
import { Connection } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication, HttpServer } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { typeOrmConfigTest } from '../src/config/typeorm.config';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { usersSeed } from './seeds/users.seed';
import { E2eTestUtils } from './test-utils';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;
    let httpServer: HttpServer;

    const adminUser = usersSeed.admins[1];
    const simpleUser = usersSeed.users[1];

    let adminAccessToken;
    let userAccessToken;

    // jest.setup.js
    jest.setTimeout(15000)

    beforeAll(async done => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(typeOrmConfigTest), AuthModule, UsersModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
        connection = app.get(Connection);

        // insert users into database
        const isAdminRegistered = await E2eTestUtils.insertUserIntoDB(httpServer, adminUser);
        const isUserRegistered = await E2eTestUtils.insertUserIntoDB(httpServer, simpleUser);

        // get access tokens
        adminAccessToken = await E2eTestUtils.getUserAccessToken(httpServer, adminUser);
        userAccessToken = await E2eTestUtils.getUserAccessToken(httpServer, simpleUser);

        done();
    });

    describe(`GET /users`, () => {
        it('Should get all user', async () => {
            const adminResponse = await request(httpServer)
                .get('/users')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(200);
            
            expect(adminResponse.body.length > 0).toBeTruthy();


            const userResponse = await request(httpServer)
                .get('/users')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            
            expect(userResponse.body.length > 0).toBeTruthy();
        });

        it('Should get 401, Unauthorized', async () => {
            const response = await request(httpServer)
                .get('/users')
                .expect(401);
        });
    });

    describe(`GET /users/:id`, () => {
        it('Should get user by id user', async () => {
            const adminResponse = await request(httpServer)
                .get('/users/1')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(200);
            
            expect(adminResponse.body.email).toBeDefined();


            const userResponse = await request(httpServer)
                .get('/users/1')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(200);
            
            expect(userResponse.body.email).toBeDefined();
        });

        it('Should get 401, Unauthorized', async () => {
            const response = await request(httpServer)
                .get('/users/1')
                .expect(401);
        });

        it('Should get 404, Not found', async () => {
            const response = await request(httpServer)
                .get('/users/999')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(404);
        });
    });

    describe(`PUT /users/:id`, () => {
        it('Should update user by id', async () => {
            const updatedUser = {...adminUser};
            updatedUser.email += "m";
            
            const response = await request(httpServer)
                .put('/users/1')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .send(updatedUser)
                .expect(200);

            expect(response.body.email).toBeDefined();
        });

        // // TODO
        // it('Should get 400, Bad request', async () => {
        //     const updatedUser: UpdateUserDto = {...adminUser};
        //     updatedUser.email = "@ewf@";
            
        //     const response = await request(httpServer)
        //         .put('/users/1')
        //         .set('Authorization', `Bearer ${adminAccessToken}`)
        //         .send(updatedUser)
        //         .expect(400);
        // });

        it('Should get 401, Unauthorized', async () => {
            const response = await request(httpServer)
                .get('/users/1')
                .expect(401);
        });

        it('Should get 403, Forbidden', async () => {
            const response = await request(httpServer)
                .put('/users/1')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(403);
        });

        // // TODO
        // it('Should get 404, Not found', async () => {
        //     const response = await request(httpServer)
        //         .put('/users/999')
        //         .set('Authorization', `Bearer ${adminAccessToken}`)
        //         .send(adminUser)
        //         .expect(404);
        // });
    });

    describe(`DELETE /users/:id`, () => {
        // TODO
        // it('Should delete user by id', async () => {
        //     const response = await request(httpServer)
        //         .delete('/users/1')
        //         .set('Authorization', `Bearer ${adminAccessToken}`)
        //         .expect(200);
        // });

        it('Should get 401, Unauthorized', async () => {
            const response = await request(httpServer)
                .delete('/users/1')
                .expect(401);
        });

        it('Should get 403, Forbidden', async () => {
            const response = await request(httpServer)
                .delete('/users/1')
                .set('Authorization', `Bearer ${userAccessToken}`)
                .expect(403);
        });

        // TODO
        it('Should get 404, Not found', async () => {
            const response = await request(httpServer)
                .delete('/users/999')
                .set('Authorization', `Bearer ${adminAccessToken}`)
                .expect(404);
        });
    });

    afterAll(async () => {
        await connection.close();
        await app.close();
    });
});
