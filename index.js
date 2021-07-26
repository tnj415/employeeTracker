const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'secretpass',
        database: 'employee_db'
    },
    // console.log(`Connected to the employee_db database.`)
);
db.connect((err) => {
    if (err)
        console.log(err);
    else
        console.log("connected to MySQL");
});
const menuQ = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all departments',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }
]
const addDepartmentQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
    }
]
const addRoleQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the role:'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role'
    },
    {
        type: 'input',
        name: 'department',
        message: 'Enter the department of the role:'
    }
]
const addEmployeeQ = [
    {
        type: 'input',
        name: 'nameFirst',
        message: 'Enter the employee\'s first name:'
    },
    {
        type: 'input',
        name: 'nameLast',
        message: 'Enter the employee\'s last name:'
    },
    {
        type: 'input',
        name: 'role',
        message: 'Enter the employee\'s role:'
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Enter the employee\'s manager:'
    }
]
const updateEmployeeRoleQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee:',
        choices: ['emp1', 'emp2', 'emp3']
    },
    {
        type: 'list',
        name: 'role',
        message: 'select a role:',
        choices: ['role1', 'role2', 'role3']
    }
]

function addDepartment(p_response) {
    return `INSERT INTO departmentTable (name)
            VALUES ('${p_response.name}')`
}

async function addRole(p_response) {

    return `INSERT INTO roleTable (title, salary, department_id) VALUES ("${p_response.name}", ${p_response.salary}, "${p_response.department}")`
}

async function addEmployee(p_response) {
    return `INSET INTO employeeTable (nameFirst, nameLast, role, manager) VALUES ("${p_response.nameFirst}", "${p_response.nameFirst}", "${p_response.role}, "${p_response.manager}")`

}
function updateEmployeeRole(p_response) {
    //${p_response.role} should be a number not a string
    return `UPDATE employeeTable SET role = "${p_response.name}" WHERE id=${p_response.role}`
}

async function menu() {



    do {
        const menuResponse = await inquirer.prompt(menuQ)
        console.log("menu: " + menuResponse);
        console.log("menu.action: " + menuResponse.action);


        switch (menuResponse.action) {

            case 'View all departments':
                db.query('SELECT * FROM departmentTable',

                    function (err, results) {
                        console.log(results);
                    });
                break;

            case 'View all roles':
                db.query('SELECT * FROM roleTable',

                    function (err, results) {
                        console.log(results);
                    });
                break;

            case 'View all employees': db.query('SELECT * FROM students',

                function (err, results) {
                    console.log(results);
                });
                break;

            case 'Add a department': const responseAD = await inquirer.prompt(addDepartmentQ)

                db.query(addDepartment(responseAD),
                    function (err, results) {
                        if (err) throw err;
                    })
                break;

            case 'Add a role': const responseAR = await inquirer.prompt(addRoleQ)

                db.query(addRole(responseAR),
                    function (err, results) {
                        if (err) throw err;
                    })
                break;

            case 'Add an employee': const responseAE = await inquirer.prompt(addEmployeeQ)

                db.query(addEmployee(responseAE),
                    function (err, results) {
                        if (err) throw err;
                    })
                break;

            case 'Update an employee role':
                const responseUER = await inquirer.prompt(updateEmployeeRoleQ)

                db.query(updateEmployeeRole(responseUER),
                    function (err, results) {
                        if (err) throw err;
                    })
                break;
                
            case 'Exit': return;
        }
    } while (true);
}

function init() {
    db.query(`mysql schema.sql`)
    
    menu();

}

init();