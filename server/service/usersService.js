const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.UsersSchema = new Schema({
      name: {
        type: String,
        required: "Require Name",
      },
      phone: {
        type: String,
        unique: true,
        required: "Require Phone number",
      },
      role: {
        type: String,
        default: "client",
        enum: ["client", "collector", "manager", "admin"],
      },
      password: {
        type: String,
        require: "Require Password",
      },
      bcrypt: String,
      frozen: {
        type: Boolean,
        default: false,
      },
      kindergarten: {
        type: Schema.Types.ObjectId,
        ref: "Kindergartens",
      },
    });
    //connect shema to DB in mongo
    mongoose.model("Users", this.UsersSchema);
    this.Users = mongoose.model("Users");
  }

  users(callback) {
    this.Users.find({}, {}, { populate: "kindergarten" }, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }

  deleteUser = (userId, callback) => {
    this.Users.deleteOne({
      _id: userId,
    }).catch((err) => {
      console.log("error", err);
      callback(err, null);
    });
    callback(null, null);
  };

  newUser(user, callback) {
    let hash = bcrypt.hashSync(user.password, 10);
    const finalUser = new this.Users({
      name: user.name,
      phone: user.phone,
      role: user.role,
      password: user.password,
      bcrypt: hash,
      kindergarten: user.kindergarten,
    });
    finalUser.save().catch((err) => {
      console.log(err);
      callback(err, null);
    });
    callback(null, finalUser);
  }

  updateUser = (user, callback) => {
    let hash = bcrypt.hashSync(user.password, 10);
    this.Users.updateOne(
      {
        phone: user.phone,
      },
      {
        name: user.name,
        role: user.role,
        password: user.password,
        bcrypt: hash,
        kindergarten: user.kindergarten,
        frozen: user.frozen,
      },
      (err, usr) => {
        if (err) {
          console.log("error", err);
          callback(err, null);
        } else callback(null, usr);
      }
    );
  };
}

module.exports = {
  usersService: new UserService(),
};
