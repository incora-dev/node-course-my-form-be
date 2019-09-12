import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication, HttpServer } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { typeOrmConfigTest } from '../src/config/typeorm.config';
import { AuthModule } from '../src/auth/auth.module';
import { usersSeed } from './seeds/users.seed';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import { E2eTestUtils } from './test-utils';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;
    let httpServer: HttpServer;

    const adminUser = usersSeed.admins[0];
    const simpleUser = usersSeed.users[0];

    // jest.setup.js
    jest.setTimeout(10000)

    beforeAll(async done => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(typeOrmConfigTest), AuthModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
        connection = app.get(Connection);

        // clear database before start
        await E2eTestUtils.clearDB(connection);

        done();
    });

    describe(`POST /auth/signup`, () => {
        it(`Should signup a new User`, async () => {
            const response = await request(httpServer)
                .post('/auth/signup')
                .send(adminUser)
                .expect(201);

            expect(response.body.email).toBeDefined();
        });

        it('Should reject duplicate registration', async () => {
            const response = await request(httpServer)
                .post('/auth/signup')
                .send(adminUser)
                .expect(409);
        });

        // TODO
        // it('Should reject registration with wrong User role', async () => {
        //     const wrongRoleUser = { ...adminUser };
        //     wrongRoleUser.email += 'w';
        //     wrongRoleUser.role = 'edfSEGE1';

        //     console.log({ wrongRoleUser });

        //     const response = await request(httpServer)
        //         .post('/auth/signup')
        //         .send(wrongRoleUser)
        //         .expect(400);
        // });
    });

    describe(`POST /auth/signin`, () => {
        it('Should login User', async () => {
            const authCredentials = {
                email: adminUser.email,
                password: adminUser.password,
            };

            const response = await request(httpServer)
                .post('/auth/signin')
                .send(authCredentials)
                .expect(201);

            expect(response.body.accessToken).toBeDefined();
        });

        it(`Shouldn't login User`, async () => {
            const wrongAuthCredentials = {
                email: simpleUser.email,
                password: simpleUser.password,
            };

            const response = await request(httpServer)
                .post('/auth/signin')
                .send(wrongAuthCredentials)
                .expect(401);
        });
    });

    afterAll(async () => {
        await connection.close();
        await app.close();
    });
});
