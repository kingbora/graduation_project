/**
 * Created by hand on 2017/4/6.
 */
var textLengthFilter = [function() {
    return function (value, max) {
        if (!value) return '';
        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        //if (wordwise) {
        //    var lastspace = value.lastIndexOf(' ');
        //    if (lastspace != -1) {
        //        value = value.substr(0, lastspace);
        //    }
        //}

        return value + '…';//'...'可以换成其它文字
    }
}];

module.exports = textLengthFilter;