import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication, HttpServer } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { typeOrmConfigTest } from '../src/config/typeorm.config';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { AuthModule } from '../src/auth/auth.module';
import { User } from '../src/users/user.entity';
import { users } from './seeds/users.seed';
import { Connection, Repository } from 'typeorm';
import * as request from 'supertest';
import { clearDB } from './test-utils';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;
    let httpServer: HttpServer;
    let usersService: UsersService;
    let userRepository: Repository<User>;

    const adminUser = users[0];
    const simpleUser = users[1];

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
            controllers: [UsersController],
            imports: [TypeOrmModule.forRoot(typeOrmConfigTest), AuthModule],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));

        app = module.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
        connection = app.get(Connection);

        // clear database before start
        clearDB(connection);
    });

    describe(`POST /auth/signup`, () => {
        it(`Should signup a new User`, async () => {
            const response = await request(httpServer)
                .post('/auth/signup')
                .send(adminUser)
                .expect(201);

            const newUser = response.body;

            expect(newUser.email).toBe(adminUser.email);
            expect(newUser.firstName).toBe(adminUser.firstName);
            expect(newUser.lastName).toBe(adminUser.lastName);
            expect(newUser.address).toBe(adminUser.address);
            expect(newUser.country).toBe(adminUser.country);
            expect(newUser.city).toBe(adminUser.city);
            expect(newUser.postalCode).toBe(adminUser.postalCode);
            expect(newUser.aboutMe).toBe(adminUser.aboutMe);
            expect(newUser.role).toBe(adminUser.role);

            const createdUser = await usersService.getUserByParams({ id: newUser.id });
            expect(newUser.email).toBe(createdUser.email);
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
        connection.close();
        await app.close();
    });
});
