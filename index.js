// const express = require('express');
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

async function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: [view, 'deptT']
                },
                {
                    name: 'View all roles',
                    value: [view, 'roleT']
                },
                {
                    name: 'View all employees',
                    value: [view, 'emT']
                },
                {
                    name: 'Add a department',
                    value: [add, 'deptT']
                },
                {
                    name: 'Add a role',
                    value: [add, 'roleT']
                },
                {
                    name: 'Add an employee',
                    value: [add, 'emT']
                },
                {
                    name: 'Update an employee role',
                    value: [update]
                },
                {
                    name: 'Exit',
                    value: () => exit(0)
                }
            ]
        }
    ])
        .then((response) => {


            response.action.length === 2 ?
                response.action[0](response.action[1]) :
                response.action[0]()
        })
        .then(() => {
            menu()
        })
}
const addDeptQ = [
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
const addEmQ = [
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
const updateQ = [
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

function view(tableName) {

    db.query(`SELECT * FROM ${tableName}`,

        function (err, results) {
            if (err) return console.log(err);
            console.table(results)
        });
}

function add(tableName) {
    // var input = '';
    console.log("Entered add function")
    switch (tableName) {

        case 'deptT':
            console.log("Entered case deptT")
            inquirer.prompt(addDeptQ)
                .then((response) => {
                    console.log("Entered .then")
                    const inputD = `INSERT INTO deptT (name)
                VALUES ('${response.name}')`

                    db.query(inputD)


                })


            break;

        case 'roleT':
            inquirer.prompt(addRoleQ)
                .then((response) => {

                    const inputR = `INSERT INTO roleT (title, salary, department_id) VALUES ('${response.name}', ${response.salary}, '${response.department}')`

                    db.query(inputR)

                })

            break;
        case 'empT':
            inquirer.prompt(addEmQ)
                .then((response) => {

                    const inputE = `INSERT INTO emT (nameFirst, nameLast, role, manager) VALUES ('${response.nameFirst}', '${response.nameFirst}', '${response.role}', '${response.manager}')`

                    db.query(inputE)

                })
            break;

    }
}

function update() {

    inquirer.prompt(updateQ)
        .then((response) => {
            db.query(
                `UPDATE empT SET role = '${response.name}' WHERE id=${response.role}`,

                function (err, results) {
                    if (err) return reject(err);
                }
            )
        })

}

menu();