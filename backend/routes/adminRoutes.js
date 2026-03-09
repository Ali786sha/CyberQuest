
// const express = require("express");
// const router = express.Router();
// const protectAdmin = require("../middleware/adminMiddleware");
// const {
//      registerAdmin,
//      loginAdmin,
//      createAdmin,
//      getAllStudents,
//      deleteStudent 
//     } = require("../controllers/adminController");

// router.post("/register", registerAdmin);
// router.post("/login", loginAdmin);
// router.post("/create", createAdmin);
// router.get("/students", protectAdmin, getAllStudents);
// router.delete("/students/:id", protectAdmin, deleteStudent);

// module.exports = router;

const express = require("express");
const router = express.Router();
const protectAdmin = require("../middleware/adminMiddleware");

// Import all controller functions
const {
  registerAdmin,
  loginAdmin,
  createAdmin,
  getAllStudents,
  deleteStudent // Make sure this is exactly the same name as in adminController
} = require("../controllers/adminController");

// Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/create", protectAdmin, createAdmin); // protectAddStudent optional
router.get("/students", protectAdmin, getAllStudents);
router.delete("/students/:id", protectAdmin, deleteStudent);




module.exports = router;
