const { Employee, User} = require("../models/Employee");
const multer = require("multer");
const path = require("path")
 
 
 
 

 
const createEmployee = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Input validation
    if (!name || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Name, phone, and address are required fields." });
    }

    const employee = new Employee({
      name,
      phone,
      address,
    });

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// multer function code

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  path.join(__dirname, "/uploads")); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

// Initialize Multer with storage options
const upload = multer({ storage: storage });

 
 

const createUser = async (req, res) => {
  try {
    const { text } = req.body;

    const image = req.file ? req.file.filename : undefined;

    if (!text) {
      return res.status(400).json({ message: "Text is a required field." });
    }
    const user = new User({
      text,
      image,
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("There is an error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id);
    res.status(200).json(userById);
  } catch (error) {
    console.error("there is error :", error);
    res.status(500).json({ message: "server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    console.error("There is an error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const delUsers = await User.deleteMany();
    res.status(200).json(delUsers);
  } catch (error) {
    console.error("There is an error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const delUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { text } = req.body;

    const updateById = await User.findByIdAndUpdate(req.params.id, { text });
    if (!updateById) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json(updateById);
  } catch (error) {
    console.error("error updating user :", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const delByIdEmp = async (req, res) => {
  try {
    const delById = await Employee.findByIdAndDelete(req.params.id);

    if (!delById) {
      res.status(400).json({ message: "user  not found" });
    }
    res.status(200).json(delById);
  } catch (error) {
    console.error("error deleting user :", error);
    res.status(500).json({ message: " server error" });
  }
};

const findByOneEmp = async (req, res) => {
  try {
    const { phone } = req.body;
    const findOneEmp = await Employee.findOne({ phone: phone });
    if (!findOneEmp) {
      res.status(400).json({ message: " user not found" });
    }
    res.status(200).json(findOneEmp);
  } catch (error) {
    console.error("error to find user :", error);
    res.status(500).json({ message: "server error" });
  }
};

const updateByIdEmp = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updateById = await Employee.findByIdAndUpdate(req.params.id, {
      name,
      phone,
      address,
    });

    if (!updateById) {
      res.status(400).json({ message: "user not found" });
    }
    res.status(200).json(updateById);
  } catch (error) {
    console.error("error to find user :", error);
    res.status(500).json({ message: "server error" });
  }
};

// image post method controller logic code

const uploadImage = async (req, res) => {
  try {
    const image = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await image.save();
    res.status(200).json(image);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

// image post method controller logic code

module.exports = {
  createEmployee,
  getEmployees,
  createUser: [upload.single("image"), createUser],
  getUser,
  deleteUsers,
  delUserById,
  getUserById,
  updateUserById,
  delByIdEmp,
  findByOneEmp,
  updateByIdEmp,
  uploadImage,
};
