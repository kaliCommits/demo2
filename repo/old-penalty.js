const pool = require("../util/Pool");

class OldPenaltyRepo{

    static async create(employee_id,cost,note,admin_id){
        const ans = await pool.query(`INSERT INTO old_penalty(employee_id,cost,note,admin_id) VALUES($1,$2,$3,$4) RETURNING *;`,[employee_id,cost,note,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT * FROM old_penalty`,[]);
        return ans;
    }

    static async single(employee_id){
        const ans = await pool.query(`SELECT * FROM old_penalty WHERE employee_id=$1;`,[employee_id]);
        return ans;
    }

    static async createWithClient(client,employee_id,cost,note,admin_id){
        const ans = await client.query(`INSERT INTO old_penalty(employee_id,cost,note,admin_id) VALUES($1,$2,$3,$4) RETURNING *;`,[employee_id,cost,note,admin_id]);
        // console.log(ans);
        return ans;
    }
}

module.exports = OldPenaltyRepo;