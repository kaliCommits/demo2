const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const CurrentPenaltyRepo = require("../../repo/current-penalty");
const BadRequestError = require("../../errors/BadRequestError");

router.delete("/api/v1/employee/:id/penalty/:p_id",async(req,res,next)=>{

    try{
        const sal = await CurrentPenaltyRepo.findById(req.params.p_id); 
        if(sal.rows.length <1){
            return next(new BadRequestError("penalty does not exist"));
        }
        await CurrentPenaltyRepo.delete(req.params.p_id);
        res.status(200).send({status:"success"});
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;