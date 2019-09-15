import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserSeederService } from './users/usersSeeder.service';
import { FieldPatternsSeederService } from './fieldPatterns/fieldPatternsSeeder.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly userSeederService: UserSeederService,
        private readonly fieldPatternsSeederService: FieldPatternsSeederService,
    ) {}

    async seed() {
        try {
            const usersCmpleted = await this.users();
            const fieldPatternsCompleted = await this.fieldPatterns();

            this.logger.debug('Successfuly completed seeding...');

            return true;
        } catch (err) {
            this.logger.error('Failed seeding...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async users() {
        try {
            const createdPatterns = await Promise.all(this.userSeederService.create());

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedUser => nullValueOrCreatedUser,
            ).length;

            this.logger.debug('No. of users created : ' + createdPatternsNumb);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding users...', err.stack);
            throw new InternalServerErrorException();
        }
    }

    async fieldPatterns() {
        try {
            const createdPatterns = await Promise.all(this.fieldPatternsSeederService.create());

            const createdPatternsNumb = createdPatterns.filter(
                nullValueOrCreatedUser => nullValueOrCreatedUser,
            ).length;

            this.logger.debug('No. of field patterns created : ' + createdPatternsNumb);
            return true;
        } catch (err) {
            this.logger.error('Failed seeding field patterns...', err.stack);
            throw new InternalServerErrorException();
        }
    }
}
