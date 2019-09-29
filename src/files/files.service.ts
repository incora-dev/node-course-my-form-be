import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FileDto } from './dto/file.dto';
import { File } from './file.entity';

@Injectable()
export class FilesService {
    private logger = new Logger('FilesService');

    constructor(
        @InjectRepository(FileRepository)
        private fileRepository: FileRepository,
    ) {}

    async createFile(fileDto: FileDto): Promise<File> {
        return this.fileRepository.createFile(fileDto);
    }

    async createFiles(filesDto: FileDto[]): Promise<File[]> {
        return await Promise.all(
            filesDto.map(async fileDto => {
                return this.fileRepository.createFile(fileDto);
            }),
        );
    }

    async findFileById(fileId: number): Promise<File> {
        const file = await this.fileRepository.findOne({ id: fileId });

        if (!file) {
            throw new NotFoundException('File not found.');
        }

        return file;
    }
}
