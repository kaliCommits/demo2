const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const CurrentSalaryRepo = require("../../repo/current-salary");
const BadRequestError = require("../../errors/BadRequestError");

router.delete("/api/v1/employee/:id/salary",async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const sal = await CurrentSalaryRepo.single(req.params.id); 
        if(sal.rows.length <1){
            return next(new BadRequestError("salary for employee does not exist"));
        }
        await CurrentSalaryRepo.delete(req.params.id);
        res.status(200).send({status:"success"});
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;