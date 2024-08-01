require('./config/config')();
const express = require('express');
const app = express();
const port = 8085;
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));


const config = require("./config/database");
console.log('当前环境3：', config)
// console.log('DB Config:', dbConfig); // 添加这行以打印配置，确保环境变量已正确加载

// 中间件
app.use(bodyParser.json());
// 路由
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
const changeRoutes = require('./routes/change');
app.use('/change', changeRoutes);
const stepsRouter = require('./routes/steps');
app.use('/api/steps', stepsRouter);
const stepsRouterNew = require('./routes/stepsNew');
app.use('/api/stepsNew', stepsRouterNew);
const {startTask} = require("./corn/stepCorn");

// 统一错误处理
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        status: 500,
        message: '服务器内部错误',
        data: err.message
    });
});

// 设置基本路由
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send('test!');
});

// 监听未捕获的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
// 开启定时任务
startTask();
// 监听端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

