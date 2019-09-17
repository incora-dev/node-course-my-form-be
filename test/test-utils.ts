import { Connection } from 'typeorm';

/**
 * Clear database
 * @param connection - connection to Database
 */
export async function clearDB(connection: Connection) {
    await connection.synchronize(true);
}
