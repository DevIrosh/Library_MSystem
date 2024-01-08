const validator = require('validator');
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    FullName: {
        type: String,
        required: true,
        maxLength: 20
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid!');
          }
        }
    },
    Phone: {
        type: String,
        required: true,
        validate(value) {
            return (validator.isMobilePhone(value, 'en-GB') ||
                    validator.matches(value, /^(\+94|0)[0-9]{9}$/));
          },
          message: 'Invalid phone number format'
        
    },
    Address: {
        type: String,
        required: true,
        maxLength:30
    },
    Password:{
        type: String,
        required: true,
        maxLength: 100
        
    },

    UserType: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User; // exporting the model