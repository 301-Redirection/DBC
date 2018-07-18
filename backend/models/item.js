module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        'Item', {
            name: DataTypes.STRING,
            cost: DataTypes.INTEGER,
            components: DataTypes.STRING,
            niceName: DataTypes.STRING,
            type: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
            tableName: 'Items',
        }
    );
    return Item;
};
