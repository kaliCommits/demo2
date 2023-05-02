const pool = require("../util/Pool");

class EmployeeRepo{

    static async create(name,password,email,phone,category,admin_id){
        const ans = await pool.query(`INSERT INTO employee(name,password,email,phone,category,admin_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,name,email,phone,category,admin_id,createdAt,updatedAt;`,[name,password,email,phone,category,admin_id]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT name,email,phone,category,admin_id,createdAt,updatedAt FROM employee`,[]);
        return ans;
    }

    static async single(id){
        const ans = await pool.query(`SELECT id,name,email,phone,category,admin_id,createdAt,updatedAt FROM employee WHERE id=$1;`,[id]);
        return ans;
    }
    static async update(name,email,phone,category,date,id){
        const ans = await pool.query(`UPDATE employee SET name=$1,email=$2,phone=$3,category=$4,updatedAt=$5 WHERE id=$6 RETURNING id,name,email,phone,category,admin_id,createdAt,updatedAt;`,[name,email,phone,category,date,id]);
        return ans;
    }
    static async delete(id){
        const ans = await pool.query(`DELETE FROM employee WHERE id=$1`,[id]);
        return ans;
    }
    static async findByName(name){
        const ans = await pool.query(`SELECT * FROM employee WHERE name=$1;`,[name]);
        return ans;
    }
    static async createWithClient(client,name,password,email,phone,category,admin_id){
        const ans = await client.query(`INSERT INTO employee(name,password,email,phone,category,admin_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,name,email,phone,category,admin_id,createdAt,updatedAt;`,[name,password,email,phone,category,admin_id]);
        // console.log(ans);
        return ans;
    }

}

module.exports = EmployeeRepo;