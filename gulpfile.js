import gulp from 'gulp';

gulp.task('test', () => {
    gulp
        .src('./src/**.js')
        .pipe(() => {
            console.log('test');
        });
});
