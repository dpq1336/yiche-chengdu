import  gulp from "gulp";
import  csso   from 'gulp-csso';
import  sass   from 'gulp-sass'; 
import  del   from 'del';  
import  prefix   from 'gulp-url-prefixer';  
import  rev from "gulp-rev";
import  plumber from "gulp-plumber";
import  revCollector from "gulp-rev-collector";
import  browserSync from 'browser-sync'; ; 
import  conf from './conf';
import  zip from 'gulp-zip';
import  gulpif from "gulp-if";
import sourcemaps   from "gulp-sourcemaps";
import autoprefixer   from "gulp-autoprefixer";
import inject   from "gulp-inject";
import uglify   from "gulp-uglify";
let isPro=false,outPath="./dist";
process.env.NODE_ENV=='prd'? isPro=true : isPro=false;
isPro?(outPath="./temp"):null;

gulp.task('listen',(cb)=>{
    gulp.watch("./src/*.html",gulp.series('buildTpl'));
	gulp.watch("./src/static/**/*.js",gulp.series('buildJs'));
	gulp.watch('./dist/static/images/**/*',gulp.series('copyImage'));
    gulp.watch('./src/static/css/**/*.scss',gulp.series('buildCss')); 
    cb();
});
gulp.task('serve',(cb)=>{ 
    browserSync.init({
        server:{
            baseDir:'./dist'
        },
        files: ["./dist/**/*.*"],
        notify:false,
        watch: true,
        reloadDelay:100,
        port:8090
    }); 
    cb();
});
gulp.task('clean',()=>{
    return  del(['./dist','./dist.zip','./temp/']);
});
gulp.task('cpAssets',(cb)=>{
    return  gulp.src(['./src/assets/**/*'])
            .pipe(plumber())
            .pipe(gulp.dest('./dist/assets/'));
});
gulp.task('buildJs',()=>{
  return   gulp.src('./src/static/js/**/*.js')
            .pipe(plumber())
            .pipe(gulpif(!isPro,sourcemaps.init()))
            .pipe(uglify())
            .pipe(gulpif(!isPro,sourcemaps.write('.')))
            .pipe(gulp.dest(outPath+'/static/js/'))
});
gulp.task('buildCss',()=>{
    var options={outputStyle: 'compressed'};
    !isPro ? options.outputStyle='expanded' : null;
    return  gulp.src(['./src/static/css/*.scss'])
            .pipe(plumber())
            .pipe(gulpif(!isPro,sourcemaps.init()))
            .pipe(autoprefixer())
            .pipe(sass.sync(options).on('error', sass.logError))
            .pipe(gulpif(isPro,csso()))
            .pipe(gulpif(!isPro,sourcemaps.write('.')))
            .pipe(gulp.dest(outPath+"/static/css/"))
   
}); 
gulp.task("copyImage", function() {
	return gulp.src(["./src/static/images/**/*"])
		.pipe(gulp.dest('./dist/static/images/'));
});
gulp.task('buildTpl',()=>{
    return gulp.src(['./src/*.html'])
        .pipe(plumber())
        .pipe(inject(gulp.src(['./src/templates/header.html']), {
            starttag: '<!-- inject:header:{{ext}} -->',
            transform: function (filePath, file) {
              return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/templates/nav.html']), {
            starttag: '<!-- inject:nav:{{ext}} -->',
            transform: function (filePath, file) {
              return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/templates/footer.html']), {
            starttag: '<!-- inject:footer:{{ext}} -->',
            transform: function (filePath, file) {
              return file.contents.toString('utf8')
            }
        }))
        .pipe(gulp.dest("./dist"))
}); 
gulp.task('revCss',()=>{
    return gulp.src(['./temp/static/**/*.css'])
    .pipe(plumber())
	.pipe(rev())
	.pipe(gulp.dest("./dist/static/"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./temp/config/css/"));
});
gulp.task('revJs',()=>{
    return gulp.src(['./temp/static/**/*.js'])
    .pipe(plumber())
	.pipe(rev())
	.pipe(gulp.dest("./dist/static/"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./temp/config/js/"));
});
gulp.task('revC',()=>{
    return gulp.src(['./dist/**/*.html','./temp/config/**/*.json'])
    .pipe(plumber())
    .pipe(revCollector())
	.pipe(gulp.dest("./dist"))
});
gulp.task('prefix',(cb)=>{
  return   gulp.src('./dist/*.html')
            .pipe(plumber())
            .pipe(prefix.html({
                prefix:conf.cdn,
                tags:['script','link']
            }))
            .pipe(gulp.dest('./dist'));
});
gulp.task('proZip',()=>{
 return gulp.src('./dist/**/*')
        .pipe(plumber())
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'));
});


let buildTask="dev";
if(process.env.NODE_ENV=='build'){
    buildTask="build:dev"
}else if(isPro){
    buildTask="build:pro"
} 
gulp.task("dev",gulp.series("clean","cpAssets","buildJs","buildCss","buildTpl","listen","serve"));
gulp.task("build:dev",gulp.series("clean","cpAssets","buildJs","buildCss","buildTpl","revCss","revJs","revC","proZip"));
gulp.task("build:pro",gulp.series("clean","cpAssets","buildJs","buildCss","buildTpl","revCss","revJs","revC","prefix","proZip"));

gulp.task('default',gulp.series(buildTask));