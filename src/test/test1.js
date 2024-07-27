const moment = require("moment/moment");
const {randomInt} = require("crypto");


function shouldExecute(data) {

    const startTime = moment(data.time_start_new, 'HH:mm');
    const endTime = moment(data.time_end_new, 'HH:mm');
    const currentTime = moment();


    console.log("endTime.diff(currentTime, 'minutes') ",  Math.abs(endTime.diff(currentTime, 'minutes')), startTime, endTime, currentTime)
    // 如果结束时间距离当前时间小于五分钟，则直接返回 true
    if ( Math.abs(endTime.diff(currentTime, 'minutes')) <= 5) {
        return true;
    }

    const diffMinutes = Math.abs(endTime.diff(currentTime, 'minutes'));

    // 计算执行的概率
    const probability = 1 / diffMinutes;

    // 生成一个 [0, 1) 区间的随机数
    const randomNumber = randomInt(0, 10000) / 10000; // 生成一个0到1之间的随机浮点数

    // 比较随机数和概率
    return randomNumber < probability;
}


console.log(shouldExecute({
     time_start_new: '19:00',
    time_end_new: '20:30'

}));