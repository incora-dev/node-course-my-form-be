import { diskStorage } from 'multer';
import { Module, BadRequestException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileRepository } from './file.repository';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { fileUtils } from '../common/utils';
import { filesConfig } from '../config/files.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileRepository]),
        MulterModule.registerAsync({
            useFactory: async () => ({
                storage: diskStorage({
                    destination: async (req, file, cb) => {
                        const filePath = fileUtils.generateUploadsPath();

                        return cb(null, filePath);
                    },
                    filename: (req, file, cb) => {
                        const uniqueName = fileUtils.generateUniqueFileName(file.originalname);

                        return cb(null, uniqueName);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const fileExtensions = fileUtils.getFileExtensions();
                    const regExpFileExtensions = new RegExp(`\.(${fileExtensions})$`);

                    if (!file.originalname.match(regExpFileExtensions)) {
                        const errFileExtensions = fileUtils.getFileExtensions(', ');

                        return cb(
                            new BadRequestException(
                                `Invalid file extension. You can upload only: ${errFileExtensions}.`,
                            ),
                            false,
                        );
                    }

                    return cb(null, true);
                },
                limits: {
                    fileSize: filesConfig.maxSizeUpload,
                },
            }),
        }),
    ],

    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
