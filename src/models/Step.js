// models/Step.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Step', {
        user: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: '账号'
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: '密码'
        },
        isExist: {
            type: DataTypes.TINYINT,
            field: "is_exist",
            defaultValue: 1,
            allowNull: true,
            comment: '是否存在'
        },
        createTime: {
            type: DataTypes.DATE,
            field: "create_time",
            defaultValue: DataTypes.NOW,
            allowNull: true,
            comment: '创建时间'
        },
        stepStart: {
            type: DataTypes.INTEGER,
            field: "step_start",
            allowNull: true,
            comment: '步数最小范围'
        },
        stepEnd: {
            type: DataTypes.INTEGER,
            field: "step_end",
            allowNull: true,
            comment: '步数最大范围'
        },
        timeStart: {
            type: DataTypes.STRING(32),
            field: "time_start",
            allowNull: true,
            comment: '时分秒 24小时制 一天最早时间 例 23:10:10'
        },
        timeEnd: {
            type: DataTypes.STRING(32),
            field: "time_end",
            allowNull: true,
            comment: '时分秒 24小时制 一天最晚时间 例 23:10:10'
        },
        dateStart: {
            type: DataTypes.DATE,
            field: "date_start",
            allowNull: true,
            comment: '日期最早时间 年月日时分秒'
        },
        dateEnd: {
            type: DataTypes.DATE,
            field: "date_end",
            allowNull: true,
            comment: '日期最晚时间 年月日时分秒'
        },
        weekDay: {
            type: DataTypes.STRING(32),
            field: "week_day",
            allowNull: true,
            comment: '一周七天 1234567  ,分割 例子 2,3,4,7'
        },
        enable: {
            type: DataTypes.INTEGER,
            field: "enable",
            allowNull: true,
            comment: '是否启用'
        },
        ip: {
            type: DataTypes.STRING(32),
            field: "ip",
            allowNull: true,
            comment: 'ip'
        }
    }, {
        tableName: 'step',
        timestamps: false
    });
};