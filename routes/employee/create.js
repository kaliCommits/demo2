const express = require("express");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const CurrentSalaryRepo = require("../../repo/current-salary");
const OldSalaryRepo = require("../../repo/old-salary");
const Password = require("../../util/Password");
const BadRequestError = require("../../errors/BadRequestError");
const Pool = require("../../util/Pool");

router.post("/api/v1/employee",[
    body("name").trim().isLength({max:20}).notEmpty(),
    body("password").trim().isLength({min:8,max:20}).notEmpty(),
    body("email").trim().isEmail().notEmpty(),
    body("phone").trim().isLength(10).notEmpty(),
    body("category").trim().notEmpty(),
    body("salary").trim().notEmpty()
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const ans = await EmployeeRepo.findByName(obj.name);
        if(ans.rows.length>=1){
            return next(new BadRequestError("employee name already taken"));
        }
        const password = await Password.toHash(obj.password);
        const client = await Pool._pool.connect();
        // console.log(client);
        try{
            await client.query("BEGIN");
            const {rows} = await EmployeeRepo.createWithClient(client,obj.name,password,obj.email,obj.phone,obj.category,req.currentUser.id);
            console.log(rows);
            const sal = await CurrentSalaryRepo.createWithClient(client,rows[0].id,obj.salary,req.currentUser.id);
            const temp = await OldSalaryRepo.createWithClient(client,rows[0].id,obj.salary,req.currentUser.id);
            await client.query("COMMIT");
            res.status(201).send(rows);
        }catch(e){
            await client.query("ROLLBACK");
            console.log(e);
           return next(new BadRequestError("transaction failed during create employee"));
        }finally{
            client.release();
        }
      //    //JWT Stuffs
      //   const userJwt = Jwt.sign(
      //   {
      //     id: rows[0].id,
      //     username: rows[0].name,
      //   },
      //   JWT_SIGN_KEY
      //   );
  
      // //making jwt as session data
      // req.session = {
      //   jwt: userJwt,
      // };
    //  res.status(201).send(rows);
    //  res.status(201).send("success");
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;