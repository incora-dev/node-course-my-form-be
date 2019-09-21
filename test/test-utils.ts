import { Connection } from 'typeorm';
import * as request from 'supertest';
import { HttpServer } from '@nestjs/common';
import { AuthCredentialsDto } from '../src/auth/dto/auth-credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';

export class E2eTestUtils {
    /**
     * Clear database before connect
     * @param connection - connection to Database
     */
    static async clearDB(connection: Connection) {
        await connection.synchronize(true);
    }

    /**
     * Insert user into database
     * @param httpServer
     * @param user
     */
    static async insertUserIntoDB(httpServer: HttpServer, user: CreateUserDto) {
        const response = await request(httpServer)
            .post('/auth/signup')
            .send(user);

        expect(response.status === 201 || response.status === 409).toBeTruthy();

        if (!response.body || !response.body.email) {
            return false;
        }

        return true;
    }

    /**
     * Get user access token
     * @param httpServer
     * @param user
     */
    static async getUserAccessToken(httpServer: HttpServer, user: CreateUserDto) {
        const authCredentials = {
            email: user.email,
            password: user.password,
        };
        const response = await request(httpServer)
            .post('/auth/signin')
            .send(authCredentials)
            .expect(201);

        if (!response.body || !response.body.accessToken) {
            return false;
        }

        return response.body.accessToken;
    }

    /**
     * Get all entities
     * @param connection - connection to Database
     */
    static async getEntities(connection: Connection) {
        const entities = [];

        const entityMetadatas = await connection.entityMetadatas;
        entityMetadatas.forEach(x => entities.push({ name: x.name, tableName: x.tableName }));

        return entities;
    }
}
