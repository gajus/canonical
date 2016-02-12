import _ from 'lodash';
import glob from 'globby';
import resolveAbsolutePath from './resolveAbsolutePath';

/**
 * Resolve an array of glob paths.
 */
export default (searchPaths: Array<string>): Array<string> => {
    let paths;

    const appendPaths = [];

    if (searchPaths.length) {
        paths = searchPaths;
    } else {
        paths = ['./'];
    }

    paths = _.filter(paths, (pathName) => {
        const exclude = _.endsWith(pathName, '/') === true;

        if (exclude) {
            appendPaths.push(pathName + '**/*.js');
            appendPaths.push(pathName + '**/*.css');
            appendPaths.push(pathName + '**/*.scss');
        }

        return !exclude;
    });

    paths = paths.concat(appendPaths);
    paths = _.uniq(paths);

    paths = glob.sync(paths);
    // @todo Test whether glob.sync can return non-unique file paths.
    // paths = _.unique(paths);

    paths = _.map(paths, resolveAbsolutePath);

    return paths;
};
