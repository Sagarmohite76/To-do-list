// //         1.Create a program using abstraction:
// // Parent class: Employee
// // Method: getSalary()
// // Child class: Manager
// // Print monthly salary


// class Employee {
//     getSalary() {
//         console.log("Salary");

//     }
// }

// class Manager extends Employee {
//     constructor(monthlysalary) {
//         super();
//         this.monthlysalary = monthlysalary;
//     }
//     getSalary() {
//         console.log(this.monthlysalary);

//     }
// }

// let e1 = new Manager(7000);
// e1.getSalary()


// // 2.Create a program using abstraction:
// // Parent class: Food
// // Method: prepare()
// // Child class: Pizza
// // Print: "Pizza is prepared"

// class Food {
//     prepare() {
//         console.log("Prepairation");

//     }
// }
// class Pizza extends Food {
//     prepare() {
//         console.log("Pizza is prepared");

//     }

// }
// const pizza = new Pizza();
// pizza.prepare();

require("dotenv").config();
// console.log(process.env.pass);
// console.log(process.env.host);
// console.log(process.env.user);
// console.log(process.env.dbname);


const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.dbname
});

app.get("/add-task", (req, res) => {

});
