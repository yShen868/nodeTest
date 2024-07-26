// routes/steps.js
const express = require('express');
const {Step: Steps} = require('../models/stepIndex');
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
        weekDay: ruleForm.selectedDays != null ? ruleForm.selectedDays.join(',') : null
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
        selectedDays: step.weekDay != null ? step.weekDay.split(',') : []
    };
}

function validateStepData(stepData) {
    const errors = {};

    if (!stepData.user) {
        errors.user = '账号不能为空';
    }

    if (!stepData.password) {
        errors.password = '密码不能为空';
    }

    if (!stepData.step_start || !stepData.step_end) {
        errors.step = '步数范围不能为空';
    }

    return errors;
}

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        let stepBody = convertRuleFormToStep(req.body)
        validateStepData(stepBody)
        const step = await Steps.create(stepBody);
        res.status(201).json(convertStepToRuleForm(step));
    } catch (error) {
        res.status(500).json({error: error.message});
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