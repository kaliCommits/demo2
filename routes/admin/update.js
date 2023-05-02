const express = require("express");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const AdminRepo = require("../../repo/admin");
const {JWT_SIGN_KEY} = require("../../config");
const Password = require("../../util/Password");
const BadRequestError = require("../../errors/BadRequestError");

router.put("/api/v1/admin/:id",[
    body("name").trim().isLength({max:20}).notEmpty(),
    body("email").trim().isEmail().notEmpty(),
    body("phone").trim().isLength(10).notEmpty(),
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const ans = await AdminRepo.single(req.params.id);
        if(ans.rows.length<1){
            return next(new BadRequestError("Admin not exist"));
        }
        const {rows} = await AdminRepo.update(obj.name,obj.email,obj.phone,new Date(),req.params.id);
        console.log(rows);
     res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;