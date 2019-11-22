const through = require('through2');
const gutil = require('gulp-util');
const doT = require('./lib/doT');
const wrapper = {
    amd: function(content) {
        return 'define(["exports"], function (exports) { exports = ' + content + ' });';
    },
    cjs: function(content) {
        return 'module.exports = ' + content;
    },
    es6: function(content) {
        return 'export default ' + content;
    },
    cmd: function(content) {
        return 'define(function(require, exports, module) { module.exports = ' + content + ' });';
    }
};

module.exports = function precompile(options) {

    return through.obj(function(file, enc, cb) {
        if(!wrapper[options.type]){
            console.log(`${options.type} type does not support!`)
        }

        if (file.isNull())
            return cb();
        if (file.isStream())
            return cb(new Error(PLUGIN_NAME + ': streaming is not supported'));

        file.path = gutil.replaceExtension(file.path, '.js');

        let dotContent = doT.template(file.contents.toString()).toString();
        dotContent = dotContent.replace(/anonymous\(it(.|[\r\n])*?\)/g, "anonymous(it)");

        file.contents = new Buffer(
            wrapper[options.type](dotContent)
        );

        this.push(file);

        cb();
    })
}