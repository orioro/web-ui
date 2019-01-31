const gulp = require('gulp')
const less = require('gulp-less')

gulp.task('compile:less', function(){
  return gulp.src('atoms/btn.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
})