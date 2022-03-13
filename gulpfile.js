const gulp = require('gulp');

// CSS
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
// JS
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');

gulp.task('html', function() {
  return gulp.src('public/*.html')
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src('public/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', notify.onError())
    .pipe(postcss([
      require('postcss-custom-properties')()
    ]))
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('js', function() {
  return gulp.src('public/js/main.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('html', 'css', function(done) {
  browserSync.init({
    server: {
      baseDir: "public/"
    },
    port: 1337,
    notify: false
  });

  gulp.watch('public/*.html',       gulp.series('html'));
  gulp.watch('public/sass/**',      gulp.series('css'));
  gulp.watch('public/js/main.js',   gulp.series('js'));
  done();
}));
