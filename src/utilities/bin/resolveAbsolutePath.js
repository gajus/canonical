import path from 'path';

/**
 * @param {string} relativePath Path relative to the process.cwd()
 * @returns {string} Absolute path.
 */
export default (relativePath) => {
    return path.resolve(process.cwd(), relativePath);
};
