const express = require("express");
const router = express.Router();
const AdminRepo = require("../../repo/admin");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/admin",async(req,res,next)=>{
    try{
        const {rows} = await AdminRepo.all();
      res.status(200).send(rows);
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;