/**
 * Created by hand on 2017/3/31.
 */
var timeFilter = [function(){
    return function(input){
        var input_date = new Date(input);
        var input_month = ("0" + (input_date.getMonth() + 1)).slice(-2) + "月";
        var input_day = ("0" + input_date.getDate()).slice(-2) + "日";
        var input_hour = ("0" + input_date.getHours()).slice(-2);
        var input_minute = ("0" + input_date.getMinutes()).slice(-2);
        var now_date = new Date();
        var day_gap = Math.ceil((now_date.getTime() - input_date.getTime())/(1000 * 60 * 60 * 24));
        console.log(day_gap);
        if (now_date.getFullYear() != input_date.getFullYear()){
            return input_date.getFullYear() +"年 "+ input_month + input_day + " " + input_hour + ':' + input_minute;
        } else {
            if (day_gap == 0) {
                return input_hour + ':' + input_minute;
            } else if (day_gap == 1) {
                return '昨天 ' + input_hour + ':' + input_minute;
            } else if (day_gap == 2) {
                return '前天 ' + input_hour + ':' + input_minute;
            } else {
                return input_month + input_day + " " + input_hour + ':' + input_minute;
            }
        }
    }
}];

module.exports = timeFilter;