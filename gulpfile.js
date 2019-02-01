const gulp = require('gulp')
const less = require('gulp-less')
const browserSync = require('browser-sync').create()

const { series } = gulp

const compileLess = () => {
  return gulp.src('demo/**/style.less')
    .pipe(less())
    .pipe(gulp.dest('demo'))
    .pipe(browserSync.stream())
}

const developmentServer = () => {
  browserSync.init({
    server: {
      baseDir: 'demo'
    }
  })

  return gulp.watch([
    'defaults/**/*.less',
    'less/**/*.less',
    'demo/**/*.less',
  ], compileLess)
}

gulp.task('compile:less', compileLess)

gulp.task('develop', series(compileLess, developmentServer))
