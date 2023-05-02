const express = require("express");
const router = express.Router();
const EmployeeRepo = require("../../repo/employee");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/employee",async(req,res,next)=>{
    try{
        const {rows} = await EmployeeRepo.all();
      res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;