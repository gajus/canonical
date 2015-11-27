import _ from 'lodash';
import glob from 'globby';
import resolveAbsolutePath from './resolveAbsolutePath';

/**
 * Uses glob to resolve all file paths recursively.
 *
 * @param {string[]} searchPaths
 * @returns {string[]}
 */
export default (searchPaths) => {
    let appendPaths,
        paths;

    appendPaths = [];

    if (searchPaths.length) {
        paths = searchPaths;
    } else {
        paths = ['./'];
    }

    paths = _.filter(paths, (pathName) => {
        let exclude;

        exclude = _.endsWith(pathName, '/') === true;

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

    // console.log('paths', paths);

    paths = _.map(paths, resolveAbsolutePath);

    // console.log('paths', paths);

    return paths;
};
