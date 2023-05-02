const pool = require("../util/Pool");

class CurrentSalaryRepo{

    static async create(employee_id,salary,admin_id){
        const ans = await pool.query(`INSERT INTO current_salary(employee_id,salary,admin_id) VALUES($1,$2,$3) RETURNING *;`,[employee_id,salary,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT * FROM current_salary`,[]);
        return ans;
    }

    static async single(employee_id){
        const ans = await pool.query(`SELECT * FROM current_salary WHERE employee_id=$1;`,[employee_id]);
        return ans;
    }
    static async update(employee_id,salary){
        const ans = await pool.query(`UPDATE current_salary SET salary=$1 WHERE employee_id=$2 RETURNING *`,[salary,employee_id]);
        return ans;
    }
    static async delete(employee_id){
        const ans = await pool.query(`DELETE FROM current_salary WHERE employee_id=$1`,[employee_id]);
        return ans;
    }

    static async createWithClient(client,employee_id,salary,admin_id){
        const ans = await client.query(`INSERT INTO current_salary(employee_id,salary,admin_id) VALUES($1,$2,$3) RETURNING *;`,[employee_id,salary,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async updateWithClient(client,employee_id,salary){
        const ans = await client.query(`UPDATE current_salary SET salary=$1 WHERE employee_id=$2 RETURNING *`,[salary,employee_id]);
        return ans;
    }
}

module.exports = CurrentSalaryRepo;