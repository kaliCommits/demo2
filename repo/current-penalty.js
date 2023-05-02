const pool = require("../util/Pool");

class CurrentPenaltyRepo{

    static async create(employee_id,cost,note,admin_id){
        const ans = await pool.query(`INSERT INTO current_penalty(employee_id,cost,note,admin_id) VALUES($1,$2,$3,$4) RETURNING *;`,[employee_id,cost,note,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT * FROM current_penalty`,[]);
        return ans;
    }

    static async single(employee_id){
        const ans = await pool.query(`SELECT * FROM current_penalty WHERE employee_id=$1;`,[employee_id]);
        return ans;
    }
    static async update(penalty_id,cost,note){
        const ans = await pool.query(`UPDATE current_penalty SET cost=$1,note=$2 WHERE id=$3 RETURNING *`,[cost,note,penalty_id]);
        return ans;
    }
    static async findById(id){
        const ans = await pool.query(`SELECT * FROM current_penalty WHERE id=$1;`,[id]);
        return ans;
    }
    static async delete(penalty_id){
        const ans = await pool.query(`DELETE FROM current_penalty WHERE id=$1`,[penalty_id]);
        return ans;
    }

    static async createWithClient(client,employee_id,cost,note,admin_id){
        const ans = await client.query(`INSERT INTO current_penalty(employee_id,cost,note,admin_id) VALUES($1,$2,$3,$4) RETURNING *;`,[employee_id,cost,note,admin_id]);
        // console.log(ans);
        return ans;
    }
}

module.exports = CurrentPenaltyRepo;