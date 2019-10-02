import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { fileUtils } from '../common/utils';
import { FilesService } from './files.service';
import { FileRepository } from './file.repository';
import { FilesController } from './files.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileRepository]),
        MulterModule.registerAsync({
            useFactory: async () => fileUtils.getUploadFilesConfig(),
        }),
    ],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
