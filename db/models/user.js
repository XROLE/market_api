'use strict';
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");

module.exports = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2'),
    allowNull: false,
    validate: {
      notNull: {
        msg: "userType cannot be null"
      }, 
      notEmpty: {
        msg: "userType cannot be empty"
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "firstName cannot be null"
      }, 
      notEmpty: {
        msg: "firstName cannot be empty"
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "lastName cannot be null"
      }, 
      notEmpty: {
        msg: "lastName cannot be empty"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "email cannot be null"
      }, 
      notEmpty: {
        msg: "email cannot be empty"
      },
      isEmail: {
        msg: "Invalid email"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "password cannot be null"
      }, 
      notEmpty: {
        msg: "password cannot be empty"
      }
    }
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value){
      if(value == this.password){
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      } else {
        throw new AppError("Password and confirm password must be the same", 400)
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: "user",
})