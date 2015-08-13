'use strict';
// установка плагинов:
// npm install --save-dev gulp gulp-useref gulp-if gulp-uglify gulp-minify-css gulp-filter gulp-imagemin rimraf gulp-jade gulp-sass

var gulp = require("gulp"),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),           // фильтр подключенных файлов
    uglify = require('gulp-uglify'),       // минификация js
    minifyCss = require('gulp-minify-css'),// минификация css
    rimraf = require('rimraf'),            // быстро удаляет весь каталог
    filter = require('gulp-filter'),       // фильтрация файлов
    imagemin = require('gulp-imagemin'),   // минификация изображений
    jade = require('gulp-jade'),           // препроцессор jade
    sass = require('gulp-sass');           // препроцессор sass
    //wiredep = require('wiredep').stream,
    //size = require('gulp-size'),
    //browserSync = require('browser-sync'),
    //gutil = require('gulp-util'),
    //ftp = require('vinyl-ftp'),
    //reload = browserSync.reload;

// ====================================================
// ============== Локальная разработка SRC ============
// ====================================================

// скомпилировать Jade в html
gulp.task('jade', function() {
  gulp.src('src/jade/pages/*.jade')
    .pipe(jade({ pretty: true }))
    .on('error', log)
    .pipe(gulp.dest('src/'))
    //.pipe(reload({stream: true}));
});

// скомпилировать Sass в css
gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

// подключить ссылки на bower components
gulp.task('wiredep', function () {
  gulp.src('src/jade/common/*.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
      }))
    .pipe(gulp.dest('src/jade/common/'))
});

// запустить локальный сервер (только после компиляции jade)
gulp.task('server', ['jade'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'src'
    }
  });
});

// следить и компилировать jade и sass
gulp.task('watch', function () {
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  // gulp.watch('bower.json', ['wiredep']);
  // gulp.watch([
  //   'app/js/**/*.js',
  //   'app/css/**/*.css'
  // ]).on('change', reload);
});

// задача по-умолчанию
gulp.task('default', ['server', 'watch']);


// ====================================================
// ================= Сборка DIST ======================
// ====================================================

// удалить каталог dist
gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});

// перенести HTML, CSS, JS в каталог dist
gulp.task('useref', function () {
  var assets = useref.assets();
  return gulp.src('src/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

// перенести шрифты
gulp.task('fonts', function() {
  gulp.src('src/fonts/*')
    .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
    .pipe(gulp.dest('dist/fonts'))
});

// сжать и перенести изображения
gulp.task('images', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});

// перенести остальные файлы, такие как favicon.ico и пр.
gulp.task('extras', function () {
  return gulp.src([
    'src/*.*',
    '!src/*.html'
    ]).pipe(gulp.dest('dist'));
});

// Сборка и вывод размера содержимого папки dist
// gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
//   return gulp.src('dist/**/*').pipe(size({title: 'build'}));
// });

// Собираем папку DIST (только после компиляции Jade)
// gulp.task('build', ['clean', 'jade'], function () {
//   gulp.start('dist');
// });

// собрать каталог DIST
gulp.task('build', ['clean'], function () {
  gulp.start('useref', 'images', 'fonts', 'extras');
});

// Проверка сборки
gulp.task('server-dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'dist'
    }
  });
});


// ====================================================
// ===================== Функции ======================
// ====================================================

// Более наглядный вывод ошибок
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}


// ====================================================
// ===== Отправка проекта на сервер ===================
// ====================================================

gulp.task( 'deploy', function() {

  var conn = ftp.create( {
      host:     'dz1.kovalchuk.us',
      user:     'kovaldn_test',
      password: 'changed',
      parallel: 10,
      log: gutil.log
  } );

  var globs = [
      'dist/**/*'
  ];

  return gulp.src(globs, { base: 'dist/', buffer: false })
    .pipe(conn.dest( 'public_html/'));

});


// ====================================================
// =============== Важные моменты  ====================
// ====================================================
// gulp.task(name, deps, fn)
// deps - массив задач, которые будут выполнены ДО запуска задачи name
// внимательно следите за порядком выполнения задач!
