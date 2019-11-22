# amdefine

A dotjs template can be converted to amd, CJS, es6, CMD standard module of the tool

## Install

```javascript
npm install gulp-dotjs-convert --save-dev
```

## Usage

```javascript
const dotjsConvert = require('gulp-dotjs-convert');
gulp.task("dotjs-convert", function(cb) {
    return gulp.src(['src/**/*.tpl'])
        .pipe(dotjsConvert({
            type: 'cmd'
        }))
        .pipe(gulp.dest('./src'));
});
```
## example
**1)** dotjs template
```html
<div>
    my name is <$=it.name$>
</div>
```
**2)** convert after

```js
// cmd
define(function(require, exports, module) {
    module.exports = function anonymous(it) {
        var out = '<div> my name is ' + (it.name) + '</div>';
        return out;
    }
});
```

```js
//adm
define(["exports"], function(exports) {
    exports = function anonymous(it) {
        var out = '<div> my name is ' + (it.name) + '</div>';
        return out;
    }
});
```

```js
//es6
export default function anonymous(it) {
    var out = '<div> my name is ' + (it.name) + '</div>';
    return out;
}
```

```js
//cjs
module.exports = function anonymous(it) {
    var out = '<div> my name is ' + (it.name) + '</div>';
    return out;
}
```

## License

New BSD and MIT. Check the LICENSE file for all the details.
