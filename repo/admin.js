const pool = require("../util/Pool");

class AdminRepo{

    static async create(name,password,email,phone){
        const ans = await pool.query(`INSERT INTO admin(name,password,email,phone) VALUES($1,$2,$3,$4) RETURNING id,name,email,createdAt,updatedAt;`,[name,password,email,phone]);
        // console.log(ans);
        return ans;
    }

    static async all(){
        const ans = await pool.query(`SELECT id,name,email,phone,createdAt,updatedAt FROM admin`,[]);
        return ans;
    }

    static async single(id){
        const ans = await pool.query(`SELECT id,name,email,phone,createdAt,updatedAt FROM admin WHERE id=$1;`,[id]);
        return ans;
    }
    static async update(name,email,phone,date,id){
        try{
            const ans = await pool.query(`UPDATE admin SET name=$1,email=$2,phone=$3,updatedAt=$4 WHERE id=$5 RETURNING id,name,email,phone,createdAt,updatedAt;`,[name,email,phone,date,id]);
            return ans;
        }catch(err){
            console.log("update error",err);
        }
        
    }
    static async delete(id){
        const ans = await pool.query(`DELETE FROM admin WHERE id=$1`,[id]);
        return ans;
    }
    static async findByName(name){
        const ans = await pool.query(`SELECT id,name,password,email,phone,createdAt,updatedAt FROM admin WHERE name=$1;`,[name]);
        return ans;
    }
}

module.exports = AdminRepo;