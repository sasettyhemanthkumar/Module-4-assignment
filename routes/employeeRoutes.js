const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
 
// image multer code

 
// POST , GET , PUT , DELETE route for employeeS
router.post("/add-emp", employeeController.createEmployee);
router.get("/get-emp", employeeController.getEmployees);
router.delete("/delbyidemp/:id", employeeController.delByIdEmp);
router.post("/add-user", employeeController.createUser);
router.get("/get-user", employeeController.getUser);
router.delete("/delete-user", employeeController.deleteUsers);
router.delete("/deluserbyid/:id", employeeController.delUserById);
router.get("/getuserbyid/:id", employeeController.getUserById);
router.put("/updateuserbyid/:id", employeeController.updateUserById);
router.post("/getempbyphone", employeeController.findByOneEmp);
router.put("/updatebyidemp/:id", employeeController.updateByIdEmp);
 

module.exports = router;
