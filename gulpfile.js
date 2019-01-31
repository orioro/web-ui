const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync').create()

const compileLess = () => {
  return gulp.src('demo/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream())
}

gulp.task('compile:less', compileLess)

gulp.task('develop', function () {
	browserSync.init({
    server: {
      baseDir: 'demo'
    }
  })

	return gulp.watch([
		'atoms/**/*.less',
		'demo/**/*.less',
	], compileLess)
})
