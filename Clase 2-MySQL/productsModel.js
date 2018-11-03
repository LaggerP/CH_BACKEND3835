module.exports = (sequelize, DataTypes) => {
    return sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        price_currency: DataTypes.CHAR,
        price_amount: DataTypes.FLOAT,
        stock: DataTypes.SMALLINT,
    },{
        timestamps: false
    })
}



