const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const reqValidator = require("../../middleware/req-validation");
const EmployeeRepo = require("../../repo/employee");
const CurrentSalaryRepo = require("../../repo/current-salary");
const OldSalaryRepo = require("../../repo/old-salary");
const BadRequestError = require("../../errors/BadRequestError");
const Pool = require("../../util/Pool");

router.put(
  "/api/v1/employee/:id/salary",
  [
    body("employee_id").trim().notEmpty(),
    body("salary").notEmpty().trim().isNumeric(),
  ],
  reqValidator,
  async (req, res, next) => {
    console.log(req.body);
    const obj = req.body;
    try {
      const sal = await CurrentSalaryRepo.single(obj.employee_id);
      if (sal.rows.length < 1) {
        return next(new BadRequestError("salary for employee does not exist"));
      }
      const client = await Pool._pool.connect();
      try {
        await client.query("BEGIN");
        const { rows } = await CurrentSalaryRepo.updateWithClient(
          client,
          obj.employee_id,
          obj.salary.toString()
        );
        const temp = await OldSalaryRepo.createWithClient(
          client,
          obj.employee_id,
          obj.salary.toString(),
          req.currentUser.id
        );
        await client.query("COMMIT");
        res.status(200).send(rows);
      } catch (e) {
        console.log(e);
        await client.query("ROLLBACK");
        return next(
          new BadRequestError("transaction failed during update salary")
        );
      } finally {
        client.release();
      }
    } catch (e) {
      console.log("error", e);
      next(new BadRequestError("something went wrong"));
    }
  }
);

module.exports = router;