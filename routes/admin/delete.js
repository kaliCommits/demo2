const express = require("express");
const router = express.Router();
const AdminRepo = require("../../repo/admin");
const BadRequestError = require("../../errors/BadRequestError");

router.delete("/api/v1/admin/:id",async(req,res,next)=>{
    try{
        const ans = await AdminRepo.single(req.params.id);
        if(ans.rows.length<1){
            return next(new BadRequestError("Admin not exist"));
        }
       await AdminRepo.delete(req.params.id);
        
        res.status(200).send({staus:"success"});
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;