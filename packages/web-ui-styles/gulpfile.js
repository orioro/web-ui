const gulp = require('gulp')
const less = require('gulp-less')
const bsInstance = require('browser-sync').create()

const { series } = gulp

const compileLess = () => {
  return gulp.src('demo/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('demo'))
    .pipe(bsInstance.stream())
}

const developmentServer = developmentServerDone => {
  bsInstance.init({
    server: {
      baseDir: 'demo'
    }
  })

  gulp.watch([
    'demo/**/*',
    '!demo/**/*.less',
    '!demo/**/*.css',
  ], done => {
    bsInstance.reload()
    done()
  })

  gulp.watch([
    'defaults/**/*.less',
    'less/**/*.less',
    'demo/**/*.less',
  ], compileLess)
}

gulp.task('compile:less', compileLess)

gulp.task('develop', series(compileLess, developmentServer))
