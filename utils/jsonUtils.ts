import fs from 'fs';
import path from 'path';

/**
 * Read a JSON file from disk and parse it.
 * @param relativePath Path relative to the project root (process.cwd()).
 */
export function readJsonFile<T>(relativePath: string): T {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent) as T;
}
