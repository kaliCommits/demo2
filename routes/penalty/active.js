const express = require("express");
const router = express.Router();
const CurrentPenaltyRepo = require("../../repo/current-penalty");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/employee/:id/penalty",async(req,res,next)=>{
    try{
        const {rows} = await CurrentPenaltyRepo.single(req.params.id); 
        if(rows.length <1){
            return next(new BadRequestError("penalty for employee does not exist"));
        }
        res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;