const pool = require("../util/Pool");

class OldSalaryRepo{

    static async create(employee_id,salary,admin_id){
        const ans = await pool.query(`INSERT INTO old_salary(employee_id,salary,admin_id) VALUES($1,$2,$3) RETURNING *;`,[employee_id,salary,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT * FROM old_salary`,[]);
        return ans;
    }

    static async single(employee_id){
        const ans = await pool.query(`SELECT * FROM old_salary WHERE employee_id=$1;`,[employee_id]);
        return ans;
    }

    static async createWithClient(client,employee_id,salary,admin_id){
        const ans = await client.query(`INSERT INTO old_salary(employee_id,salary,admin_id) VALUES($1,$2,$3) RETURNING *;`,[employee_id,salary,admin_id]);
        // console.log(ans);
        return ans;
    }
}

module.exports = OldSalaryRepo;