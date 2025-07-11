const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image : {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

 
 



const Employee = mongoose.model("Employee", employeeSchema);
const User = mongoose.model("User", userSchema);
 


module.exports = {
  Employee,
  User,
 
};
