import * as fs from 'fs';
import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    async deleteFile(fileId: number): Promise<void> {
        const file = await this.findOne({ id: fileId });

        if (!file) {
            throw new NotFoundException(`File with ID "${fileId}" not found.`);
        }

        // delete file from database
        const deletedResult = await this.delete({ id: file.id });

        if (deletedResult.affected === 0) {
            throw new InternalServerErrorException(`File with ID "${fileId}" not deleted.`);
        }

        // delete file from uploads directory
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
}
