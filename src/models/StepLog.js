// models/Step.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('StepLog', {
        user: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: '账号'
        },
        createTime: {
            type: DataTypes.STRING(32),
            field: "create_time",
            allowNull: true,
            comment: '创建时间'
        },
        timeq: {
            type: DataTypes.STRING(32),
            field: "timeq",
            allowNull: true,
            comment: '创建时间 时分'
        },
        step: {
            type: DataTypes.INTEGER,
            field: "step",
            allowNull: true,
            comment: '步数最小范围'
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
        }
    }, {
        tableName: 'step_log',
        timestamps: false
    });
};