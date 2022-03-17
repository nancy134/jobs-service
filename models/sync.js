'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sync = sequelize.define('Sync', {
        accountId: DataTypes.STRING,
        service: {
            type: DataTypes.ENUM,
            values: ["Spark", "Constant"]
        },
        updateComplete: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {});

    return Sync;
}