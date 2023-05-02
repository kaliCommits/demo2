const express = require("express");
const router = express.Router();
const CurrentSalaryRepo = require("../../repo/current-salary");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/employee/:id/salary",async(req,res,next)=>{
    try{
        const {rows} = await CurrentSalaryRepo.single(req.params.id); 
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