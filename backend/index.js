const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require('multer');
const path = require("path")

const assertsFolder = path.join(__dirname, "assets")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const storage = multer.memoryStorage(); // You can adjust this based on your requirements
const upload = multer({ storage: storage });

const router = express.Router()

const app = express();

app.use(express.json());

app.use(cors());

//CONNECTION OBJECT
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empconcor"
})

//ADMIN LOGIN API
app.post('/login', (req, res) => {
    const {username, password} =  req.body
    const sql = `SELECT * FROM admin WHERE email = '${username}'`;
    db.query(sql, (err, data) => {
        if(data[0].length === 0){
            res.json(false)
            res.status(400)
        }else{
            if (data[0].password === password){
                res.json(true)
            }else{
                res.json(false)
            }
        }
    })
})

//HR LOGIN API
app.post('/hrlogin', (req, res) => {
    const {username, password} =  req.body
    const sql = `SELECT * FROM hrdetails WHERE email = '${username}'`;
    db.query(sql, (err, data) => {
        if(data.length === 0){
            res.json(false)
        }else{
            if (data[0].password === password){
                res.json(true)
            }else{
                res.json(false)
            }
        }
    })
})
//EMPLOYE LOGIN API
app.post('/employelogin', (req, res) => {
    const {username, password} =  req.body
    const sql = `SELECT * FROM employe WHERE email = '${username}'`;
    db.query(sql, (err, data) => {
        if(data.length === 0){
            res.json(false)
        }else{
            if (data[0].password === password){
                res.json(true)
            }else{
                res.json(false)
            }
        }
    })
})
//POST HR REGESTER API
app.post('/hrdetails', (req, res) => {
    const dbSql = `SELECT * FROM hrdetails WHERE email = '${req.body.email}'`
    db.query(dbSql, (err, data) => {
        console.log(data)
        if (data.length === 0){
            const sql = "INSERT INTO hrdetails (`name`, `email`, `password`, `phone`, `compeny`) VALUES (?)";
            const values = [
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.phoneNo,
                req.body.compeny,
            ]
            db.query(sql, [values], (err, data) => {
                if(err) return  res.json("Error")
                return res.json("HR Added Successfully")
            })
        }else{
            res.json("HR Alredy Exists")
        }
    })
    
})
//POST CANDIT REGESTER
app.post('/user', (req, res) => {
    const {name, position, experience, location, salary, email, phoneNo, about, address} = req.body
    const sql = "INSERT INTO user (`name`, `position`, `experience`, `location`, `salary`, `email`, `phoneno`, `about`, `address`) VALUES (?)";
    const values = [name, position, experience, location, salary, email, phoneNo, about, address]
    db.query(sql, [values], (err, data) => {
        if(err) return  res.json("Error")
        return res.json(data)
    })
})
//POST USER TO INTERVIEW API
app.post('/interviewdata', (req, res) => {
    const {accesscode, name, position, experience, location, salary, email, phoneno, about, address, accept} = req.body
    const sql = "INSERT INTO interviewdata (`accesscode`, `name`, `position`, `experience`, `location`, `salary`, `email`, `phoneno`, `about`, `address`, `accept`) VALUES (?)";
    const values = [accesscode, name, position, experience, location, salary, email, phoneno, about, address, accept]
    db.query(sql, [values], (err, data) => {
        if(err) return  res.json("Error")
        return res.json(data)
    })
})
//POST USER TO OFFERACPDATA
app.post('/offeracpdata', (req, res) => {
    const {accesscode, name, position, experience, location, salary, email, phoneno, about, address} = req.body
    const accept = "no"
    const sql = "INSERT INTO offerdata (`accesscode`, `name`, `position`, `experience`, `location`, `salary`, `email`, `phoneno`, `about`, `address`, `accept`) VALUES (?)";
    const values = [accesscode, name, position, experience, location, salary, email, phoneno, about, address, accept]
    db.query(sql, [values], (err, data) => {
        if(err) return  res.json(err)
        return res.json(data)
    })
})
//POST USER TO ONBOARDING
app.post('/onboarding', (req, res) => {
    const {accesscode, name, position, experience, location, salary, email, phoneno, about, address} = req.body
    const sql = "INSERT INTO onboardingdata (`accesscode`, `name`, `position`, `experience`, `location`, `salary`, `email`, `phoneno`, `about`, `address`) VALUES (?)";
    const values = [accesscode, name, position, experience, location, salary, email, phoneno, about, address]
    db.query(sql, [values], (err, data) => {
        if(err) return  res.json(err)
        return res.json(data)
    })
})
//POST USER TO EMPLOYE
app.post('/employedata', (req, res) => {
    const {accesscode, name, position, experience, location, salary, email, phoneno, about, address, password, role} = req.body
    const sql = "INSERT INTO employe (`accesscode`, `name`, `position`, `experience`, `location`, `salary`, `email`, `phoneno`, `about`, `address`, `password`, `role`) VALUES (?)";
    const values = [accesscode, name, position, experience, location, salary, email, phoneno, about, address, password, role]
    db.query(sql, [values], (err, data) => {
        if(err) return  res.json(err)
        return res.json(data)
    })
})
//POST EMPLOYE DATA
app.post('/employeregester',(req,res)=>{
    const {name,userid,jobposition,location,dateofbirth,email,number,address, randomcolor} = req.body
    const sql = "INSERT INTO employedata  (`name`,`employeid`,`position`,`location`,`dob`,`email`,`phoneno`,`address`, `randomcolor`) VALUES (?) ";
     db.query(sql,[[name,userid,jobposition,location,dateofbirth,email,number,address, randomcolor]],(err,data)=>{
        if (err) return res.json(err);
        return res.json(data)
     })
})

//POST EMPLOYE ATTENDANCE
app.post('/attindance', (req, res) => {
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const Y = date.getFullYear()
    const M = date.getMonth()
    const D = date.getDate()
    const dbtime = `${h}:${m}:${s}`
    const employeId = req.body.employeId
    const dbDate = `${Y}-${M + 1}-${D}`
    const timeOut = ""
    const name = req.body.name
    const sql = "INSERT INTO attendance (`employeid`, `name`, `date`, `timein`, `timeout`) VALUES (?)";
    const values = [employeId,name,dbDate, dbtime, timeOut]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//POST EMPLOYE PROFILE
/*app.post('/profile', upload.single('avatar'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    const { avatar } = req.file;
  
    avatar.mv(path.join(assertsFolder, avatar.name), (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send('File uploaded successfully');
    });
  });*/





//PUT EMPLOYE ATTENDANCE
app.put('/attindance', (req, res) => {
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const Y = date.getFullYear()
    const M = date.getMonth()
    const D = date.getDate()
    const dbTime = `${h}:${m}:${s}`
    const employeId = req.body.employeId
    const dbDate = `${Y}-${M + 1}-${D}`
    const sql = "UPDATE attendance SET timeout = ? WHERE employeid = ? AND date = ?";
    const values = [dbTime, employeId, dbDate];  // Include all parameters in the values array

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("Update successful");
    });
});


//PUT EMPLOYE ATTENDANCE
app.put('/accepted', (req, res) => {
    const {email, confirmation} = req.body
    const sql = "UPDATE offerdata SET accept = ? WHERE email = ?";
    const values = [confirmation, email];  // Include all parameters in the values array

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("Update successful");
    });
});




//DELETE USER FROM APPLICATION
app.delete("/user/:id", (req, res) => {
    const sql = "DELETE FROM user WHERE id =  ?"
    const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//DELETE USER FROM INTERVIEW
app.delete("/interviewdata/:id", (req, res) => {
    const sql = "DELETE FROM interviewdata WHERE id =  ?"
    const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


//DELETE USER FROM OFFER DATA
app.delete("/offerdata/:id", (req, res) => {
    const sql = "DELETE FROM offerdata WHERE id =  ?"
    const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//DELETE USER FROM ONBOARDING
app.delete("/onboarding/:id", (req, res) => {
    const sql = "DELETE FROM onboardingdata WHERE id =  ?"
    const id = req.params.id
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//GET USER API
app.get("/user", (req, res) => {
    const sql = "SELECT * FROM user"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }
    ) 
})

//GET HRDetails API
app.get("/hrdetails", (req, res) => {
    const sql = `SELECT * FROM hrdetails`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }
    ) 
})

//GET ADMIN API
app.get("/admindata", (req, res) => {
    const sql = `SELECT * FROM admin`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }
    ) 
})

//GET INTERVIEW DATA
app.get("/interviewdata", (req, res) => {
    const sql = `SELECT * FROM interviewdata`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

//GET OFFER DATA
app.get("/offeracpdata", (req, res) => {
    const sql = `SELECT * FROM offerdata`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})


//GET ONBOARDING DATA
app.get("/onboarding", (req, res) => {
    const sql = `SELECT * FROM onboardingdata`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

//GET EMPLOYE DATA
app.get("/employedata", (req, res) => {
    const sql = `SELECT * FROM employedata`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

//GET ATTENDACE DATA TODAY
app.get("/empattendancetoday", (req, res) => {
    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const sql = `SELECT * FROM attendance WHERE date = ?`
    const values = [today]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

//GET EMPLOYE DETAILS DATA
app.get("/emp-details", (req, res) => {
    const sql = `SELECT * FROM attendance WHERE employeid = ?`
    const values = [req.query.empId]
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err)
        }
        res.json(data)
    });
});

//GET ATTENDACE DATA TODAY
app.get("/empattendanceeveryday", (req, res) => {
    const sql = `SELECT * FROM attendance`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})


//GET TIMEIN DATA
app.get("/timeindata", (req, res) => {
    const sql = `SELECT * FROM attendancetimein`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

//GET TIMEIN DATA
app.get("/timeoutdata", (req, res) => {
    const sql = `SELECT * FROM attindancetimeout`
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }) 
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SERVER RUNNING STATUS
app.listen(4006, () => {
    console.log("Server is running at empconcor-api.bedatatech.com:4006")
})









//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST DUMMY DATA
app.post('/send-email', (req, res) => {
    const { to, subject, body, name } = req.body;
  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // or 587 for TLS
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'bdtemployeestatus@gmail.com',
            pass: "pmjwjulscjvelncd"
        }
    });
  
    const options = {
        from: 'bdtemployeestatus@gmail.com',
        to: to,
        subject: subject,
        text: body,
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
        
            .logo {
              max-width: 100%;
              height: auto;
            }
        
            .content {
              text-align: justify;
              margin-bottom: 20px;
            }
        
            .button {
              display: inline-block;
              padding: 10px 20px;
              text-decoration: none;
              background-color: #3498db;
              color: #ffffff;
              border-radius: 3px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img class="logo" src="https://beedatatech.com/ripplingpics/EmpConcorlogo.png" alt="Company Logo">
              <h1>EMP CONCOR</h1>
            </div>
        
            <div class="content">
              <p>
                Hello ${name},
              </p>
              <p>
                ${body}
              </p>
            </div>
            <div style="text-align: center;">
              <a class="button" href="http://a266e5d.online-server.cloud:3000/candidate-conformation-farm">Click To Conform</a>
            </div>
          </div>
        </body>
        </html>`
    };
  
    transporter.sendMail(options, function (err, success) {
        if (err) {
            response.json(err);
        } else {
            response.json("Successfully Send");
        }
    });
});







//DUMMY 2
app.post('/employee', (req, res) => {
    const output = { error: false };
    const { employee, status } = req.body;

    // Adjust SQL queries as needed
    const sqlSelectEmployee = "SELECT * FROM employees WHERE employee_id = ?";
    const sqlSelectAttendance = "SELECT * FROM attendance WHERE employee_id = ? AND date = ?";

    // ... Other SQL queries ...

    conn.query(sqlSelectEmployee, [employee], (err, result) => {
        if (err) {
            output.error = true;
            output.message = err.message;
            res.json(output);
            return;
        }

        if (result.length > 0) {
            const row = result[0];
            const id = row.id;
            const dateNow = new Date().toISOString().split('T')[0];

            // ... Handle time in and time out ...

            res.json(output);
        } else {
            output.error = true;
            output.message = 'Employee ID not found';
            res.json(output);
        }
    });
});










