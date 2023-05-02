const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const CurrentPenaltyRepo = require("../../repo/current-penalty");
const OldPenaltyRepo = require("../../repo/old-penalty");
const BadRequestError = require("../../errors/BadRequestError");
const Pool = require("../../util/Pool");

router.post("/api/v1/employee/:id/penalty",[
    body("cost").trim().notEmpty(),
    body("note").trim().notEmpty()
],reqValidator,async(req,res,next)=>{
    console.log(req.body);
    const obj = req.body;
    try{
        const emp = await EmployeeRepo.single(req.params.id);
        if(emp.rows.length < 1){
            return next(new BadRequestError("employee does not exist"));
        }
        const client = await Pool._pool.connect();
        try{
            await client.query("BEGIN");
            const {rows} = await CurrentPenaltyRepo.createWithClient(client,req.params.id,obj.cost,obj.note,req.currentUser.id);
            const temp = await OldPenaltyRepo.createWithClient(client,req.params.id,obj.cost,obj.note,req.currentUser.id);
            await client.query("COMMIT");
            res.status(201).send(rows);
        }catch(e){
            console.log(e);
            await client.query("ROLLBACK");
            return next(new BadRequestError("transaction failed during create penalty"));
        }finally{
            client.release();
        }
        
    }catch(e){
        console.log("error",e);
        next(new BadRequestError("something went wrong"));
    }
});

module.exports = router;