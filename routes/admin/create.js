const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const AdminRepo = require("../../repo/admin");
const Password = require("../../util/Password");
const reqValidator = require("../../middleware/req-validation");
const BadRequestError = require("../../errors/BadRequestError");

router.post("/api/v1/admin",[
    body("name").trim().isLength({max:20}).notEmpty(),
    body("password").trim().isLength({min:5,max:20}).notEmpty(),
    body("email").trim().isEmail().notEmpty(),
    body("phone").trim().isLength(10).notEmpty(),
],reqValidator,async(req,res,next)=>{
    try{
        const obj = req.body;
        const password = await Password.toHash(obj.password);
        const {rows} = await AdminRepo.create(obj.name,password,obj.email,obj.phone);
        res.status(201).send(rows);

    }catch(err){
        console.error(err);
        next(new BadRequestError("something went wrong while creating admin"));
    }
});

module.exports = router;