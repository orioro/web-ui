const path = require('path')
const gulp = require('gulp')
const less = require('gulp-less')
const size = require('gulp-size')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const bsInstance = require('browser-sync').create()

const { series } = gulp

const {
  LESS_DIRS = 'demo'
} = process.env

const compileLessDemo = () => {

  const LESS_GLOB = LESS_DIRS.split(',').map(dir => path.join(dir, '/**/*.less'))

  console.log(`Will compile less from ${LESS_GLOB}`)

  return gulp.src(LESS_GLOB, { base: 'demo' })
    .pipe(less())
    // .pipe(cleanCSS({
    //   level: 2
    // }))
    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions'],
    //   cascade: false
    // }))
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
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
  ], compileLessDemo)
}

gulp.task('compile:less-demo', compileLessDemo)

gulp.task('develop', series(compileLessDemo, developmentServer))
