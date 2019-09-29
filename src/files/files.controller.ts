import {
    Controller,
    Param,
    Post,
    Get,
    Delete,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { File } from './file.entity';
import { FileDto } from './dto/file.dto';
import { IdDto } from '../common/dto/id.dto';
import { FilesService } from './files.service';

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

    @Get('file/:id')
    async getUploadedFile(@Param() params: IdDto): Promise<File> {
        return await this.filesService.findFileById(params.id);
    }

    @Delete('file/:id')
    async deleteUploadedFile(@Param() params: IdDto): Promise<void> {
        return await this.filesService.deleteFile(params.id);
    }
}
