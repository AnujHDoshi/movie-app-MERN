const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
})

const Movie = sequelize.define('movies', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    schema: 'public'
});

module.exports = Movie;