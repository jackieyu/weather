

const gulp  		= require('gulp');
const connect 		= require('gulp-connect')
const webserver 	= require('gulp-webserver')
const concat        = require('gulp-concat');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');
const cssMin		= require('gulp-cssmin');
const pump 			= require('pump');
const rev           = require('gulp-rev');
const revCollector  = require('gulp-rev-collector');
/*因为gulp执行任务是异步的,如果我们希望按顺序执行，就可以使用gulp-sequence*/
const runsequence   = require('gulp-sequence'); 
const del           = require('del');
const templateCache = require('gulp-angular-templatecache');
const replacehtml   = require('gulp-html-replace');
const ngannotate    = require('gulp-ng-annotate');
const args 			= require('yargs').argv
const ngConstant	= require('gulp-ng-constant')




var rootPath = "./";

/**
 * 文件目录
 */
const source = {
	root: rootPath,
	config: rootPath + "config/",
	js: rootPath + 'js/',
	views: rootPath + "views/*.html",
	template: rootPath + "template/*.html",
	style: rootPath + 'style/*.css',
	font: rootPath + 'font/**/*'
}

/**
 * 打包的目录
 */
const buildPath = {
	root: rootPath + "build/",
	js: rootPath + "build/js/",
	lib: rootPath + 'build/lib/',
	style: rootPath + 'build/style/',
	html: rootPath + "build/index.html",
	revJson: rootPath + "build/json/**/*.json",
	font: rootPath+ 'build/font'
}

const lib = [
	'./bower_components/angular-ui-router/release/angular-ui-router.js',
	'./bower_components/angular-route/angular-route.js'
]


gulp.task('default', function(){
	gulp.src('./')
		.pipe(webserver({
				port: 8080,
				open: true
		}))

})


gulp.task('build', function(cb){
	runsequence('clear:build', ['compile:templates', 'compile:directive', 'copy:json'], ['js:min', 'css:min', 'lib:min', 'copy:html', 'copy:font'],  'replacehtml', 'rev')(cb);

})

/**
 * 切换环境的配置
 */
gulp.task('env', function(){
	//env:要打包的环境变量
	var env = args.env || "developer";
	console.log("env >.", (source.config+env+'.config.json'))
	gulp.src( source.config + env + '.config.json')
        .pipe(ngConstant({
            name: 'app.Config',
        }))
        .pipe(rename({
            basename: 'config.module',
            exname: '.js'
        }))
        .pipe(gulp.dest(source.js))
})


gulp.task("js:min", function(cb){
	pump([
			gulp.src([(source.js+"/**/*.module.js"),(source.js + "/**/*.js")]),
			ngannotate(),  /*规范依赖注入，避免angularjs压缩产生找不到对应的依赖模块*/
			concat('app.js'),
			uglify(),
			rename({
				suffix: '.min',
				extname: '.js'
			}),
			rev(),
			gulp.dest(buildPath.js),
			rev.manifest(),
			rename({
				basename: "js-rev"
			}),
			gulp.dest(buildPath.root + "/json")
		],
		cb)
})

gulp.task('css:min', function(cb){
	pump([
			gulp.src(source.style),
			concat('style.css'),
			cssMin(),
			rename({
				extname: '.min.css'
			}),
			rev(),
			gulp.dest(buildPath.style),
			rev.manifest(),
			rename({
				basename:"css-rev"
			}),
			gulp.dest(buildPath.root + "/json")
		],
		cb)
})

gulp.task('clear:build', function(){
	return del([(buildPath.root+"/**/**/*")]).then(function(path){
		console.log(path);
	})
})

/**
 * 压缩HTML到templateCache变为javascript文件
 * 
 */
gulp.task('compile:templates', function(){
	gulp.src(['./views/*.html'])
		.pipe(templateCache({
			root:"views"
			// standalone: true
		}))
		.pipe(rename({
			basename:'template'
		}))
		.pipe(gulp.dest(source.js))
})

gulp.task('compile:directive', function(){
	gulp.src('./template/*.html')
		.pipe(templateCache({
			// standalone: true,
			root: 'template'
		}))
		.pipe(rename({
			basename: 'directive-template'
		}))
		.pipe(gulp.dest(source.js))
})


gulp.task('copy:html', function(){
	gulp.src("./index.html")
		.pipe(gulp.dest(buildPath.root))
})


gulp.task('replacehtml', function(){
	gulp.src(buildPath.html)
		.pipe(replacehtml({
			'js': './js/app.min.js',
			'css': './style/style.min.css',
			'lib': './lib/lib.min.js'
		}))
		.pipe(gulp.dest(buildPath.root))
})

gulp.task("rev", function(){
	gulp.src([buildPath.revJson, buildPath.html])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest(buildPath.root))
})

gulp.task('lib:min', function(){
	gulp.src(lib)
		.pipe(concat("lib.js"))
		.pipe(uglify())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(rev())
		.pipe(gulp.dest(buildPath.lib))
		.pipe(rev.manifest())
		.pipe(rename({
			basename: 'lib-rev'
		}))
		.pipe(gulp.dest(buildPath.root + "/json"))
})


gulp.task('copy:font', function(){
	gulp.src(source.font)
		.pipe(gulp.dest(buildPath.font))
})

gulp.task('copy:json', function(){
	gulp.src('./js/*.json')
		.pipe(gulp.dest(buildPath.js))
})









