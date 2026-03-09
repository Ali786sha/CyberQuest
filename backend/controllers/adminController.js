const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// exports.createAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.create(req.body);
//     res.status(201).json(admin);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createAdmin = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email,
//       password, // Ensure hashing inside model or pre-save hook
//     });

//     res.status(201).json({ message: "Student created", user: newUser });
//   } catch (error) {
//     console.error("Create Student Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name: `${firstName} ${lastName}`, // <- Fix
      email,
      password // Ensure hashing inside model or pre-save hook
    });

    res.status(201).json({ message: "Student created", user: newUser });
  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Student 
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find().select("-password");

    res.status(200).json({
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// //Create Student 
// exports.createAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.create(req.body);
//     res.status(201).json(admin);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id; // ⬅️ Missing line

    const student = await User.findByIdAndDelete(studentId); // findByIdAndDelete handles deletion

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Student Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
