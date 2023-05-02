const express = require("express");
const router = express.Router();
const OldSalaryRepo = require("../../repo/old-salary");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/employee/:id/salary/history",async(req,res,next)=>{
    try{
        const {rows} = await OldSalaryRepo.single(req.params.id); 
        if(rows.length <1){
            return next(new BadRequestError("salary for employee does not exist"));
        }
        res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;