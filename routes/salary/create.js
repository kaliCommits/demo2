const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const CurrentSalaryRepo = require("../../repo/current-salary");
const OldSalaryRepo = require("../../repo/old-salary");
const BadRequestError = require("../../errors/BadRequestError");
const Pool = require("../../util/Pool");

router.post("/api/v1/employee/:id/salary",[
    body("employee_id").trim().notEmpty(),
    body("salary").trim().notEmpty(),
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const emp = await EmployeeRepo.single(obj.employee_id);
        if(emp.rows.length < 1){
            return next(new BadRequestError("employee does not exist"));
        }
        const sal = await CurrentSalaryRepo.single(obj.employee_id); 
        if(sal.rows.length >=1){
            return next(new BadRequestError("already salary created,use update or delete instead"));
        }
        const client =  await Pool._pool.connect();
        try{
            await client.query("BEGIN");
            const {rows} = await CurrentSalaryRepo.createWithClient(client,obj.employee_id,obj.salary,req.currentUser.id);
            const temp = await OldSalaryRepo.createWithClient(client,obj.employee_id,obj.salary,req.currentUser.id);
            await client.query("COMMIT");
            res.status(201).send(rows);
        }catch(e){
            console.log(e);
            await client.query("ROLLBACK");
            return next(new BadRequestError("transaction failed during create salary"));
        }finally{
            client.release();
        }
       
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;