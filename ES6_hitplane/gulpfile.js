

//获取gulp对象
var gulp = require("gulp");


var uligfy = require("gulp-uglify");//JS 压缩插件
var babel = require("gulp-babel");//es6转es5
var minifyCss = require('gulp-minify-css'); //css压缩插件


//定义任务
gulp.task("jsTask1",function(){
	gulp.src("src/js/bullet.js")
	    .pipe(babel({"presets": ["es2015"]}))//es6转ES5插件
	    .pipe( uligfy() )
	    .pipe( gulp.dest("dest/js") );
})

gulp.task("jsTask2",function(){
	gulp.src("src/js/enemy.js")
	    .pipe(babel({"presets": ["es2015"]}))//es6转ES5插件
	    .pipe( uligfy() )
	    .pipe( gulp.dest("dest/js") );
})

gulp.task("jsTask3",function(){
	gulp.src("src/js/gameEngine.js")
	    .pipe(babel({"presets": ["es2015"]}))//es6转ES5插件
	    .pipe( uligfy() )
	    .pipe( gulp.dest("dest/js") );
})

gulp.task("jsTask4",function(){
	gulp.src("src/js/myPlane.js")
	    .pipe(babel({"presets": ["es2015"]}))//es6转ES5插件
	    .pipe( uligfy() )
	    .pipe( gulp.dest("dest/js") );
})
gulp.task("jsTask5",function(){
	gulp.src("src/js/base.js")
	    .pipe(babel({"presets": ["es2015"]}))//es6转ES5插件
	    .pipe( uligfy() )
	    .pipe( gulp.dest("dest/js") );
})

gulp.task("cssTask",function(){
	gulp.src("src/css/dafeiji.css")
	    .pipe( minifyCss() )
	    .pipe( gulp.dest("dest/css") );
})

//默认任务
gulp.task("default",["jsTask5"]);
