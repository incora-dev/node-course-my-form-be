import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserSeederService } from './users/usersSeeder.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly userSeederService: UserSeederService,
    ) {}

    async seed() {
        try {
            const completed = await this.users();
            this.logger.debug('Successfuly completed seeding...');

            return completed;
        } catch (err) {
            this.logger.error('Failed seeding...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async users() {
        try {
            const createdUsers = await Promise.all(this.userSeederService.create());

            const createdUsersNumb = createdUsers.filter(
                nullValueOrCreatedUser => nullValueOrCreatedUser,
            ).length;

            this.logger.debug('No. of users created : ' + createdUsersNumb);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding users...', err.stack);
            throw new InternalServerErrorException();
        }
    }
}
