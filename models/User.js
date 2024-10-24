const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    // username
    username: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Not less than 2 characters is allowed"],
      maxLength: [40, "Not more than 40 characters is allowed"],
      unique: true,
    },

    // email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+([-_.]?[a-zA-Z0-9]+[_]?){1,}@([a-zA-Z0-9]{2,}\.){1,}[a-zA-Z]{2,4}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },

    // password
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
            v
          );
        },
        message: (props) =>
          `Min 8 Chars: upperCase, lowerCase, number/special Char needed`,
      },
    },

    // country
    country: {
      type: String,
      required: [true, "Country of the user is required"],
    },

    // user img
    userImgUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    // user city
    city: {
      type: String,
      required: [true, "City of the user is required"],
    },
    // user phone number
    phone: {
      type: String,
      required: [true, "Phone number of the user is required"],
    },
    // if the user is admin or not
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message:
    "Another user with the same {PATH} already exists. Please try with another one.",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
