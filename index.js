const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession =require("cookie-session");
const currentUser = require("./middleware/current-user");
const requireAuth = require("./middleware/require-auth");
const adminOnlyAuth = require("./middleware/adminonlyauth");
const errorHandler = require("./middleware/error-handler");
const pool = require("./util/Pool");
require('dotenv').config();
//routes
//admin
const adminCreate = require("./routes/admin/create");
const adminAll = require("./routes/admin/all");
const adminSingle = require("./routes/admin/single");
const adminUpdate = require("./routes/admin/update");
const adminDelete = require("./routes/admin/delete");
//employee
const employeeCreate = require("./routes/employee/create");
const employeeAll = require("./routes/employee/all");
const employeeSingle = require("./routes/employee/single");
const employeeUpdate = require("./routes/employee/update");
const employeeDelete = require("./routes/employee/delete");
//auth
const signin = require("./routes/auth/signin");
const signout = require("./routes/auth/signout");
const currentUserRoute = require("./routes/auth/current-user");

//salary
const salaryUpdate = require("./routes/salary/update");
const salaryDelete = require("./routes/salary/delete");
const singleCurrentSalary = require("./routes/salary/single-current-salary");
const singleSalaryHistory = require("./routes/salary/single-salary-history");

//penalty
const penaltyCreate = require("./routes/penalty/create");
const penaltyDelete = require("./routes/penalty/delete");
const penaltyActive = require("./routes/penalty/active");
const penaltyAll = require("./routes/penalty/all");

const corsOptions = {
    // origin: "https://drainagemonitor.herokuapp.com",
    origin: process.env.NODE_ENV === "production"?process.env.FRONTEND_URL:"http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
};
  
app.use(cors(corsOptions));
app.use(express.json());
//worked for backend with postman

if (process.env.NODE_ENV === "production"){
  app.use(
      cookieSession({
        signed: false,
        secure: true,
        sameSite: "none",
        domain:process.env.FRONTEND_URL, //frontend domain
      })
    );
}else{
  app.use(
    cookieSession({
      signed: false,
      // secure: true,
      sameSite: "lax",
      domain: "localhost", //frontend domain
    })
  );
}
  




  

//auth routes
app.use(signin);
app.use(currentUserRoute);

  
//admin routes
app.use(adminCreate);

app.use(currentUser);
app.use(requireAuth);
app.use(signout);
app.use(adminOnlyAuth)
app.use(adminAll);
app.use(adminSingle);
app.use(adminUpdate);
app.use(adminDelete);


//employee routes
app.use(employeeCreate);
app.use(employeeAll);
app.use(employeeSingle);
app.use(employeeUpdate);
app.use(employeeDelete);

//salary
app.use(salaryUpdate);
app.use(salaryDelete);
app.use(singleCurrentSalary);
app.use(singleSalaryHistory);

//penalty
app.use(penaltyCreate);
app.use(penaltyDelete);
app.use(penaltyActive);
app.use(penaltyAll);




app.use(errorHandler);

const init = async()=>{
  try{
    await pool.connect({
     host:process.env.DBHOST,
     port:process.env.DBPORT,
     database:process.env.DBNAME,
     user:process.env.DBUSER,
     password:process.env.DBPASSWORD
    });
    console.log("db successfully connected");
    app.listen(4000,()=>{
      console.log(`server started on 4000`);
    });
  }catch(err){
    console.error("db error",err);
    
  }  
}

const initProd = async () => {
  console.log("hello");
  try {
    await pool.connect({
      connectionString: process.env.DBSTR,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    console.log("db successfully connected");
    app.listen(4000, () => {
      console.log(`server started on 4000`);
    });
  } catch (err) {
    console.error("db error", err);
  }
};

if(process.env.NODE_ENV === "production"){
  initProd();
}else{
  init();
}



