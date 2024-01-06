import operatorModel from "../models/operatorModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { shopname, ownername, phone, email, password } = req.body;


    // Validation
    if (!shopname) {
      return res.send({ error: "ShopName is Required" })
    }
    if(!ownername) {
      return res.send({message: "Ownername is Required"})
    }
    if(!phone) {
      return res.send({message: "Phone is Required"})
    }
    if(!email) {
      return res.send({message : "Email is Required"})
    }
    if(!password) {
      return res.send({message : "Password is Required"})
    }

    // Existing operator
    const existingOperator = await operatorModel.findOne({ email });
    if (existingOperator) {
      return res.status(200).send({
        success: true,
        message: 'Already registered. Please login.',
      });
    }

    // Register operator
    const hashedPassword = await hashPassword(password);

    // Save
    const operator = await new operatorModel({
      shopname,
      ownername,
      phone,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Operator registered successfully',
      operator,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};

// Post Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check operator
    const operator = await operatorModel.findOne({ email });
    if (!operator) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registered',
      });
    }

    const match = await comparePassword(password, operator.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: 'Invalid password',
      });
    }

    // Token
    const token = await JWT.sign(
      { _id: operator._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '176d',
      }
    );

    res.status(200).send({
      success: true,
      message: 'Login successful',
      operator: {
        _id: operator._id,
        shopname: operator.shopname,
        ownername: operator.ownername,
        phone: operator.phone,
        email: operator.email,
      },      
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

//test controller
export const testController = (req,res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};