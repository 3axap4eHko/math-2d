'use strict';

const sourceDir = './src';
const buildDir = './build';

const Path = require('path');
const Fs = require('fs');
const Del = require('del');
const Gulp = require('gulp');
const Babel = require('gulp-babel');
const Sourcemaps = require('gulp-sourcemaps');
const ESLlint = require('gulp-eslint');
//const Uglify = require('gulp-uglify');
const Through = require('through2');
const replacePathExpr = /\\|\//g;
const replaceNameExpr = /\\|\/|\-|\.|_/g;


Gulp.task('clean', cb => {
    return Del([buildDir], cb);
});

Gulp.task('export', () => {
    const indexModules = {};
    return Gulp.src([`${sourceDir}/**/*.js`, `!${sourceDir}/index.js`])
        .pipe(Through.obj( (file, enc, cb) => {
            const relativeFilename = Path.relative(sourceDir, file.history[file.history.length-1]).replace(replacePathExpr, '/').replace('.js','');
            const moduleName = relativeFilename.split(replaceNameExpr).map( (name, idx) => idx ? (name[0].toUpperCase() + name.slice(1)) : name ).join('');
            indexModules[moduleName]=relativeFilename;
            cb(null, file);
        }, cb => {
            const indexFile = Object.keys(indexModules).map( m => `import * as ${m} from './${indexModules[m]}';`);
            indexFile.push('export default {\n    ' + Object.keys(indexModules).join(',\n    '));
            indexFile.push('};');
            Fs.writeFile(`${sourceDir}/index.js`, indexFile.join('\n'), cb);
        } ))
});

Gulp.task('js-compile', ['clean'], function() {
    return Gulp.src([`${sourceDir}/**/*.js`])
        .pipe(ESLlint())
        .pipe(ESLlint.format())
        .pipe(ESLlint.failAfterError())
        .pipe(Sourcemaps.init())
        .pipe(Babel())
//        .pipe(Uglify())
        .pipe(Sourcemaps.write('.'))
        .pipe(Gulp.dest(buildDir));
});

Gulp.task('files-copy', ['clean'], function() {
    return Gulp.src(['./package.json', './README.md'])
        .pipe(Gulp.dest(buildDir));
});

Gulp.task('default', ['clean', 'export', 'js-compile', 'files-copy']);