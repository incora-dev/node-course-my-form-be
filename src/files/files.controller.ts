import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileDto } from './dto/file.dto';
import { AuthGuard } from '@nestjs/passport';
import { File } from './file.entity';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: FileDto): Promise<File> {
        if (!file) {
            throw new BadRequestException('No file sent.');
        }

        return await this.filesService.createFile(file);
    }

    @Post('files')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: FileDto[]): Promise<File[]> {
        if (!files) {
            throw new BadRequestException('No files sent.');
        }

        return await this.filesService.createFiles(files);
    }
}
