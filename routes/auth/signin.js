const express = require("express");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const AdminRepo =require("../../repo/admin");
const Password = require("../../util/Password");
const BadRequestError = require("../../errors/BadRequestError");

router.post("/api/v1/signin",[
    body("name").trim().isLength({max:20}).notEmpty(),
    body("password").trim().isLength({min:8,max:20}).notEmpty(),
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    let finalObj = {};
    let isAdmin = false;
    try{
        if(req.query.m === "admin"){
            console.log(req.query.m);
            const {rows} = await AdminRepo.findByName(obj.name);
            if(rows.length<1){
                return next(new BadRequestError(`invalid credentials`));
            }
            const validPassword = await Password.toCompare(rows[0].password,obj.password);
            if(!validPassword){
                return next(new BadRequestError(`invalid credentials`));
            }
            finalObj = rows[0];
            isAdmin = true;
        }else{
            console.log(req.query.m);
            const {rows} = await EmployeeRepo.findByName(obj.name);
            if(rows.length<1){
                return next(new BadRequestError(`invalid credentials`));
            }
            console.log(rows[0]);
            const validPassword = await Password.toCompare(rows[0].password,obj.password);
            if(!validPassword){
                return next(new BadRequestError(`invalid credentials`));
            }
            finalObj = rows[0];
        }
        
         //JWT Stuffs
        const userJwt = Jwt.sign(
        {
          id: finalObj.id,
          name: finalObj.name,
          type:isAdmin?"admin":"employee"
        },
        process.env.JWT_SIGN_KEY
        );
  
      //making jwt as session data
      req.session = {
        jwt: userJwt,
      };
     res.status(200).send({id:finalObj.id,name:finalObj.name});
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;