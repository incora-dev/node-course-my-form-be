import * as fs from 'fs';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
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
