const express = require("express");
const router = express.Router();
const EmployeeRepo = require("../../repo/employee");
const BadRequestError = require("../../errors/BadRequestError");

router.delete("/api/v1/employee/:id",async(req,res,next)=>{
    try{
        const ans = await EmployeeRepo.single(req.params.id);
        if(ans.rows.length<1){
            return next(new BadRequestError("employee not exist"));
        }
       await EmployeeRepo.delete(req.params.id);
        
        res.status(200).send({staus:"success"});
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;