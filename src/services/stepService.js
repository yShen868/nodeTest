const express = require('express');
const {Step: Steps, StepLog: StepLogs, sequelize: sequelizes, StepLog} = require('../models/stepIndex');
const ResponseFactory = require("../models/response");
const router = express.Router();
const User = require("../models/user");
const {json} = require("express");
const {QueryTypes} = require('sequelize');
const moment = require("moment");

const getUserData = () => {
    // 模拟获取用户数据
    return new User(1, 'John Doe', 'john.doe@example.com');
};


function getArrayValue(array, index) {
    return array != null ? array[index] : null;
}

function convertRuleFormToStep(ruleForm) {
    return {
        user: ruleForm.username,
        password: ruleForm.password,
        isExist: 1, // 默认值
        stepStart: getArrayValue(ruleForm.step, 0),
        stepEnd: getArrayValue(ruleForm.step, 1),
        timeStart: getArrayValue(ruleForm.timeRange, 0),
        timeEnd: getArrayValue(ruleForm.timeRange, 1),
        dateStart: getArrayValue(ruleForm.dateRange, 0),
        dateEnd: getArrayValue(ruleForm.dateRange, 1),
        weekDay: ruleForm.selectedDays != null ? ruleForm.selectedDays.join(',') : null,
        enable: ruleForm.enable
    };
}

function convertStepToRuleForm(step) {
    return {
        username: step.user,
        password: step.password,
        step: [
            step.stepStart,
            step.stepEnd
        ],
        timeRange: [
            step.timeStart,
            step.timeEnd
        ],
        dateRange: [
            step.dateStart,
            step.dateEnd
        ],
        selectedDays: step.weekDay != null ? step.weekDay.split(',') : [],
        enable: step.enable
    };
}

function validateStepData(stepData) {
    const errors = {};

    if (stepData.user === undefined || !stepData.user) {
        errors.message = '账号不能为空';
        return errors;
    }

    if (stepData.password === undefined || !stepData.password) {
        errors.message = '密码不能为空';
        return errors;
    }

    if (stepData.stepStart === undefined || stepData.stepEnd === undefined || !stepData.stepStart || !stepData.stepEnd) {
        errors.message = '步数范围不能为空';
    }

    return errors;
}


const create = async (body, ip) => {

    try {
        console.log("create", body)
        let stepBody = convertRuleFormToStep(body)
        console.log("stepBody", stepBody)
        const err = validateStepData(stepBody)
        if (err.message != null) {
            res.status(500).json({error: err.message});
        }
        // 查询步骤表中是否存在已有的用户
        const existingStep = await Steps.findOne({
            attributes: ['id', 'user', 'password'], // 仅选择 user 和 password 字段
            where: {
                user: stepBody.user,
                password: stepBody.password,
                is_exist: 1
            }
        });
        stepBody.ip = ip
        if (existingStep) {
            // 更新现有记录
            // 更新现有记录
            const upd = await existingStep.update(stepBody);
            console.log("create upd", upd)
            return ResponseFactory.success('更新成功');
        } else {
            const step = await Steps.create(stepBody);
        }
        // res.status(201).json(convertStepToRuleForm(step));
        return ResponseFactory.success("保存成功");
    } catch (error) {
        console.log(error)
        return ResponseFactory.failure("保存失败");
    }
}

const list = async (page, limit) => {
    try {
        console.log("list req", page, limit)
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const steps = await Steps.findAndCountAll({
            where: {is_exist: 1}, // 只查询 is_exist 为 1 的记录
            offset,
            limit,
            order: [['id', 'ASC']]
        });
        if (steps.rows.length === 0) {
            return ResponseFactory.success({count: 0, rows: []}); // 如果没有数据，直接返回空数组
        }
        // 将 Step 对象转换为 RuleForm 对象
        const ruleForms = steps.rows.map(step => {
            const x = convertStepToRuleForm(step);
            x.password = null;
            return x;
        });
        return ResponseFactory.success({count: steps.count, rows: ruleForms});
    } catch (error) {
        return ResponseFactory.failure("error");
    }
}

const update = async (id, body) => {
    try {
        const step = await Steps.findByPk(id);
        if (!step) {
            return ResponseFactory.failure({message: 'Not found1'});
        }
        console.log(`update before${JSON.stringify(step)} after${JSON.stringify(body)}`)
        if (step.user !== body.username || step.password !== body.password) {
            return ResponseFactory.failure({message: 'Not found2'});
        }
        let formToStep = convertRuleFormToStep(body);
        console.log("formToStep", formToStep)
        const upd = await step.update(formToStep);
        console.log("upd", upd)
        return ResponseFactory.success('更新成功');
    } catch (error) {
        return ResponseFactory.failure('更新失败');
    }
}

const deleteStep = async (id, body) => {
    try {
        const step = await Steps.findByPk(id);
        if (!step) {
            return ResponseFactory.success('Not found');
        }
        console.log("before{} after{}", step, body)
        if (step.username !== body.user || step.password !== body.password) {
            return ResponseFactory.success('Not found');
        }
        // await step.destroy();
        await step.update({is_exist: 0});

        return ResponseFactory.success('删除成功');
    } catch (error) {
        return ResponseFactory.failure('删除失败');
    }
}

function getCurrentWeekdayAsNumber() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // getDay() 返回 0 (Sunday) 到 6 (Saturday)

    // 将 0 映射为 7 (Sunday)，其他保持不变
    return dayOfWeek === 0 ? 7 : dayOfWeek;
}

async function fetchSteps(page = 0) {
    const limit = 100;
    const offset = page * limit;


    const now1 = new Date();
    const hours = String(now1.getHours()).padStart(2, '0');
    const minutes = String(now1.getMinutes()).padStart(2, '0');

    const weekOfDay = getCurrentWeekdayAsNumber();

    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    const query2 = `    SELECT a.* ,DATE_FORMAT(time_start, '%H:%i') time_start_new, DATE_FORMAT(time_end, '%H:%i') time_end_new
    FROM step a
    WHERE a.enable = 1
      AND a.is_exist = 1
      AND (a.date_start IS NULL OR a.date_start < '${now}')
      AND (a.date_end IS NULL OR a.date_end > '${now}')
      AND (
        HOUR(a.time_start) < ${hours} OR (
            HOUR(a.time_start) =  ${hours} AND MINUTE(a.time_start) <=  ${minutes}
        )
      )
      and (week_day is null or week_day = '' or week_day like '%${weekOfDay}%')
      AND (
        HOUR(a.time_end) > ${hours} OR (
            HOUR(a.time_end) = ${hours} AND MINUTE(a.time_end) >= ${minutes}
        )
      )
    ORDER BY a.id ASC
    LIMIT ${limit}
    OFFSET ${offset};
    `;

    try {
        const results = await sequelizes.query(query2, {
            type: QueryTypes.SELECT,
            raw: true
        });

        console.log("result:", JSON.stringify(results))
        return results;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}

// 获取今天的开始时间
function getStartOfToday() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    return startOfToday;
}

// 获取今天的结束时间
function getEndOfToday() {
    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return endOfToday;
}

async function fetchStepsLog(id, timeStart, timeEnd) {

    //
    const start = getStartOfToday()
    const end = getEndOfToday()

    const query2 = `    
    select * from step_log where step_id = ${id} and timeq > '${timeStart}' and timeq  < '${timeEnd}' and create_time < '${end}' and create_time > '${start}'  and is_exist = 1
    `;
    console.log("fetchStepsLog ", query2)
    try {
        const results = await sequelizes.query(query2, {
            type: QueryTypes.SELECT,
            raw: true
        });

        console.log("fetchStepsLog result:", JSON.stringify(results))
        return results;
    } catch (error) {
        console.error('Error executing SQL query:', error);
        throw error;
    }
}


const createLog = async (body) => {
    try {
        await StepLogs.create(body);
    } catch (error) {
        console.error("createLog error", error)
    }
}


module.exports = {
    getUserData,
    create,
    list,
    update,
    deleteStep,
    fetchSteps,
    createLog,
    fetchStepsLog
};