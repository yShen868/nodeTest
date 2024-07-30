// models/Step.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StepExecLog', {
        user: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: '账号'
        },
        createTime: {
            type: DataTypes.DATE,
            field: "create_time",
            defaultValue: DataTypes.NOW,
            allowNull: true,
            comment: '创建时间'
        },
        timeq: {
            type: DataTypes.STRING(32),
            field: "timeq",
            allowNull: true,
            comment: '创建时间 时分'
        },
        step_id: {
            type: DataTypes.INTEGER,
            field: "step_id",
            allowNull: true,
            comment: 'id'
        },
        success: {
            type: DataTypes.INTEGER,
            field: "success",
            allowNull: true,
            comment: '是否成功'
        },
        type1: {
            type: DataTypes.TINYINT,
            field: "type_1",
            defaultValue: 0,
            allowNull: true,
            comment: '是否执行过'
        },
        type2: {
            type: DataTypes.TINYINT,
            field: "type_2",
            defaultValue: 0,
            allowNull: true,
            comment: '是否执行判断1-小于5分钟'
        },
        type3: {
            type: DataTypes.TINYINT,
            field: "type_3",
            defaultValue: 0,
            allowNull: true,
            comment: '是否执行判断2-随机'
        },
        sub_time: {
            type: DataTypes.INTEGER,
            field: "sub_time",
            defaultValue: null,
            allowNull: true,
            comment: '相差时间'
        }
    }, {
        tableName: 'step_exec_log',
        timestamps: false
    });
};