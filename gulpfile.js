let gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	rename         = require('gulp-rename'),
	cssnano      = require('gulp-cssnano'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	autoprefixer = require('gulp-autoprefixer'),
	del         = require('del'),
    cleanCSS = require('gulp-clean-css');


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch',['browser-sync','css-libs', 'scripts'] ,function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        // .pipe(cssnano())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/wow/dist/wow.min.js',
        'app/libs/sumoselect/jquery.sumoselect.min.js',
        'app/libs/datepicker/dist/datepicker.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {

    let buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    let buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    let buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    let buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

    let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));



});


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});