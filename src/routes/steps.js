// routes/steps.js
const express = require('express');
const {Step: Steps} = require('../models/stepIndex');
const ResponseFactory = require("../models/response");
const router = express.Router();


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

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        let stepBody = convertRuleFormToStep(req.body)
        console.log("stepBody", stepBody)
        const err = validateStepData(stepBody)
        if (err.message != null) {
            res.status(500).json({error: err.message});
        }
        // 查询步骤表中是否存在已有的用户
        const existingStep = await Steps.findOne({
            attributes: ['user', 'password'], // 仅选择 user 和 password 字段
            where: {
                user: stepBody.user,
                password: stepBody.password,
                is_exist: 1
            }
        });

        if (existingStep) {
            // 更新现有记录
            const upd = await existingStep.update(stepBody);
            console.log("create upd", upd)
            return ResponseFactory.success('更新成功');
        } else {
            const step = await Steps.create(stepBody);
        }


        // res.status(201).json(convertStepToRuleForm(step));
        res.status(200).json(ResponseFactory.success("保存成功"));
    } catch (error) {
        res.status(500).json(ResponseFactory.failure("保存失败"));
    }
});

router.get('/list', async (req, res) => {
    try {
        console.log("list req:{}", req.query)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const steps = await Steps.findAndCountAll({
            where: {is_exist: 1}, // 只查询 is_exist 为 1 的记录
            offset,
            limit,
            order: [['id', 'ASC']]
        });

        if (steps.rows.length === 0) {
            return res.json({count: 0, rows: []}); // 如果没有数据，直接返回空数组
        }

        // 将 Step 对象转换为 RuleForm 对象
        const ruleForms = steps.rows.map(step => convertStepToRuleForm(step));

        res.json({count: steps.count, rows: ruleForms});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const step = await Steps.findByPk(id);
        if (!step) {
            return res.status(404).json({message: 'Not found'});
        }
        console.log("before{} after{}", step, req.body)
        if (step.username !== req.body.user || step.password !== req.body.password) {
            return res.status(404).json({message: 'Not found'});
        }
        let formToStep = convertRuleFormToStep(req.body);
        console.log("formToStep", formToStep)
        const upd = await step.update(formToStep);
        console.log("upd", upd)
        res.json(convertStepToRuleForm(upd));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const step = await Steps.findByPk(id);
        if (!step) {
            return res.status(404).json({message: 'Not found'});
        }
        console.log("before{} after{}", step, req.body)
        if (step.username !== req.body.user || step.password !== req.body.password) {
            return res.status(404).json({message: 'Not found'});
        }
        // await step.destroy();
        await step.update({is_exist: 0});

        res.json({message: 'Deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;