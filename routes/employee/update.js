const express = require("express");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const {JWT_SIGN_KEY} = require("../../config");
const Password = require("../../util/Password");
const BadRequestError = require("../../errors/BadRequestError");

router.put("/api/v1/employee/:id",[
    body("name").trim().isLength({max:20}).notEmpty(),
    body("email").trim().isEmail().notEmpty(),
    body("phone").trim().isLength(10).notEmpty(),
    body("category").trim().notEmpty(),
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const ans = await EmployeeRepo.single(req.params.id);
        if(ans.rows.length<1){
            return next(new BadRequestError("employee not exist"));
        }
        const {rows} = await EmployeeRepo.update(obj.name,obj.email,obj.phone,obj.category,new Date(),req.params.id);
        
     res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;