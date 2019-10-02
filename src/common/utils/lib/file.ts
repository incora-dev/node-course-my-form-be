import * as fs from 'fs';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { filesConfig } from '../../../config/files.config';

/**
 * Generate path to uploads directory
 */
export function generateUploadsPath(): string {
    let uploadsPath = `${__dirname}/../../../../uploads/`;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath);
    }

    uploadsPath = path.join(uploadsPath, `${year}`);

    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath);
    }

    uploadsPath = path.join(uploadsPath, `${month}`);

    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath);
    }

    return uploadsPath;
}

/**
 * Generate unique file name
 */
export function generateUniqueFileName(fileName: string): string {
    const fileExtension = path.extname(fileName);

    return uuidv4() + fileExtension;
}

/**
 * Get available file extensions for the application
 */
export function getFileExtensions(sep: string = '|'): string {
    const availableExtensions: object = filesConfig.availableExtensions;

    let extensionsArr = [];

    for (const extensionsType in availableExtensions) {
        if (availableExtensions.hasOwnProperty(extensionsType)) {
            extensionsArr = extensionsArr.concat(availableExtensions[extensionsType]);
        }
    }

    return extensionsArr.join(sep);
}

/**
 * Load configurations for upload files in module
 */
export function getUploadFilesConfig() {
    return {
        storage: diskStorage({
            destination: async (req, file, cb) => {
                const filePath = this.generateUploadsPath();

                return cb(null, filePath);
            },
            filename: (req, file, cb) => {
                const uniqueName = this.generateUniqueFileName(file.originalname);

                return cb(null, uniqueName);
            },
        }),
        fileFilter: (req, file, cb) => {
            const fileExtensions = this.getFileExtensions();
            const regExpFileExtensions = new RegExp(`\.(${fileExtensions})$`);

            if (!file.originalname.match(regExpFileExtensions)) {
                const errFileExtensions = this.getFileExtensions(', ');

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
            files: filesConfig.maxFilesNumb,
        },
    };
}
