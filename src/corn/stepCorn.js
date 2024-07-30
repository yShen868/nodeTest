const cron = require('node-cron');
const {fetchSteps, fetchStepsLog, createLog} = require("../services/stepService");
const moment = require("moment");
const {randomInt} = require("crypto");
const {motionRunner} = require("../services/changeService");


// 5秒 * * * * * */5  */10 * * * * *
// 定义一个任务，每隔一分钟执行一次  */1 * * * *  * * * * *
function startTask() {


    cron.schedule('* * * * *', () => {
        // 获取当前时间
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // 打印日期和时间
        console.log(`[${year}-${month}-${day} ${hours}:${minutes}:${seconds}] 定时任务启动`);


        for (let i = 0; i < 1; i++) {

            fetchSteps(i).then(res => {
                console.log("fetchSteps", res, res.length);
                if (res.length === 0) {
                    console.log(`不存在执行任务 当前时间:${moment().format('YYYY-MM-DD HH:mm:ss')} 不存在执行任务`)
                    return;
                }
                res.forEach(a => {


                    fetchStepsLog(a.id, a.time_start_new, a.time_end_new).then(res => {
                        if (res.length !== 0) {
                            console.log(`当前时间已经执行 当前时间:${moment().format('YYYY-MM-DD HH:mm:ss')}  ${a.id}-${a.user} 当前时间已经执行`)
                            return;
                        }

                        let exec = shouldExecute(a)
                        if (exec) {
                            console.log(`执行任务 当前时间:${moment().format('YYYY-MM-DD HH:mm:ss')}  ${a.id}-${a.user} 执行任务`)

                            const stepRandom = randomInt(a.step_start, a.step_end)
                            const logReal = {
                                user: a.user,
                                step_id: a.id,
                                step: stepRandom,
                                success: 1,
                                timeq: `${hours}:${minutes}`,
                                create_time : moment().format('YYYY-MM-DD HH:mm:ss')
                            }

                            motionRunner(a.user, a.password, stepRandom).then(res => {
                                if (res.status === 200) {
                                    logReal.success = 1;
                                } else {
                                    logReal.success = 0;
                                }
                                createLog(logReal).catch(e => {
                                    console.log(e)
                                });
                            }).catch(res => {
                                logReal.success = 3;

                                console.log("---------------", logReal)

                                createLog(logReal).catch(e => {
                                    console.log(e)
                                });

                            })


                        } else {
                            console.log(`不执行任务 当前时间:${moment().format('YYYY-MM-DD HH:mm:ss')}  ${a.id}-${a.user} 不执行任务`)
                        }

                    })


                })


            }).catch(err => {
                console.log(err)
            })
        }

    }).start();
    console.log('corn start')
}

const changeSt = async (i) => {
    return await fetchSteps();

}


function shouldExecute(data) {

    const startTime = moment(data.time_start_new, 'HH:mm');
    const endTime = moment(data.time_end_new, 'HH:mm');
    const currentTime = moment();


    console.log("endTime.diff(currentTime, 'minutes') ", Math.abs(endTime.diff(currentTime, 'minutes')), startTime, endTime, currentTime)
    // 如果结束时间距离当前时间小于五分钟，则直接返回 true
    if (Math.abs(endTime.diff(currentTime, 'minutes')) <= 5) {
        return true;
    }

    // 执行概率提高
    const diffMinutes = Math.abs(endTime.diff(currentTime, 'minutes'));

    // 计算执行的概率
    const probability = 1 / diffMinutes;

    // 生成一个 [0, 1) 区间的随机数
    const randomNumber = randomInt(0, 10000) / 10000; // 生成一个0到1之间的随机浮点数

    // 比较随机数和概率
    return randomNumber < probability;
}


module.exports = {
    startTask
}

