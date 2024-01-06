import JWT from "jsonwebtoken";
import operatorModel from "../models/operatorModel.js";

export const requireSignIn = async (req,res,next) => {
        try {
                const decode = JWT.verify(
                  req.headers.authorization,
                  process.env.JWT_SECRET
                );
                req.user = decode;
                next();
              } catch (error) {
                console.log(error);
              }
            };

//admin acceess
export const isAdmin = async (req, res, next) => {
        try {
          const operator = await operatorModel.findById(req.user._id);
          if (operator.role !== 1) {
            return res.status(401).send({
              success: false,
              message: "UnAuthorized Access",
            });
          } else {
            next();
          }
        } catch (error) {
          console.log(error);
          res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
          });
        }
      };