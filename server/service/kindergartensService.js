const mongoose = require("mongoose");
const { Schema } = mongoose;

class KindergartenService {
  constructor() {
    this.KindergartensSchema = new Schema({
      name: {
        type: String,
        required: "Require Name",
      },
      phone: {
        type: String,
        required: "Require Phone number",
      },
      city: {
        type: String,
        required: "Require City",
      },
      address: {
        type: String,
        required: "Require Address",
      },
      frozen: {
        type: Boolean,
        default: false,
      },
      Created: {
        type: Date,
        default: Date.now(),
      },
      lastUpdated: Date,
      staff: [
        {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
      history: [
        {
          type: Schema.Types.ObjectId,
          ref: "History",
        },
      ],
      cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      },
    });
    //connect shema to DB in mongo
    mongoose.model("Kindergartens", this.KindergartensSchema);
    this.Kindergartens = mongoose.model("Kindergartens");
  }

  kindergartens(callback) {
    this.Kindergartens.find({}, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }

  deleteUser = (kindergartensPhone, callback) => {
    this.Kindergartens.deleteOne(
      {
        phone: kindergartensPhone,
      },
      (err, usr) => {
        if (err) {
          console.log("error", err);
          callback(err, null);
        } else callback(null, usr);
      }
    );
  };

  newKindergarten(kindergarten, callback) {
    let address = kindergarten.street + " " + kindergarten.apartmentNumber;
    const finalKindergarten = new this.Kindergartens({
      name: kindergarten.name,
      phone: kindergarten.phone,
      city: kindergarten.city,
      address: address,
    });
    finalKindergarten.save().catch((err) => {
      console.log(err);
      callback(err, null);
    });
  }

  updateKindergarten = (kindergarten, callback) => {
    this.Kindergartens.updateOne(
      {
        phone: kindergarten.phone,
      },
      {
        name: kindergarten.name,
        city: kindergarten.city,
        frozen: kindergarten.frozen,
        lastUpdated: Date.now(),
      },
      (err, data) => {
        if (err) {
          console.log("error", err);
          callback(err, null);
        } else callback(null, data);
      }
    );
  };

  updateStaffKindergarten = (user, callback) => {
    this.Kindergartens.updateOne(
      {
        _id: user.kindergarten,
      },
      {
        $addToSet: {
          staff: [user._id],
        },
      }
    ).catch((err) => {
      console.log(err);
      callback(err, null);
    });
  };
  deleteStaffKindergarten = (user, callback) => {
    this.Kindergartens.updateOne(
      {
        _id: user.kindergarten._id,
      },
      {
        $pull: {
          staff: user._id,
        },
      }
    ).catch((err) => {
      console.log(err);
      callback(err, null);
    });
  };
}

module.exports = {
  kindergartensService: new KindergartenService(),
};
