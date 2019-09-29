import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { File } from './file.entity';
import { FileDto } from './dto/file.dto';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    private logger = new Logger('FileRepository');

    async createFile(fileDto: FileDto) {
        const file = await this.save(fileDto);

        if (!file) {
            this.logger.error('File not created: ' + fileDto);
            throw new InternalServerErrorException('File not created.');
        }

        return file;
    }
}
