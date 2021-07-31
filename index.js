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
    else {
        console.log("connected to MySQL");
    }
});

var addDeptQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department: '
    }
]
var addRoleQ = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the name of the role: ',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role: '
    },
    {
        type: 'list',
        name: 'department',
        message: 'Select the department of the role: ',
        choices: []
    }
]
var addEmQ = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name: '
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name: '
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select the employee\'s role: ',
        choices: []
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select the employee\'s manager: ',
        choices: []
    }
]

var updateQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee: ',
        choices: []

    },
    {
        type: 'list',
        name: 'role',
        message: 'select a role: ',
        choices: []
    }
]

async function getEmployees() {

    const select = `SELECT id, last_name, first_name, manager_id FROM emT `;
    let employeeArr = []
    let managerArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];

    for (let i in rows) {

        let e = {

            name: rows[i].last_name + ' ' + rows[i].first_name,
            value: rows[i].id
        }

        employeeArr.push(e)

        if (rows[i].manager_id === null) {

            let m = {

                name: rows[i].last_name + ' ' + rows[i].first_name,
                value: rows[i].id
            }
            managerArr.push(m)
        }
    }

    managerArr.push({ name: 'None', value: null });

    addEmQ[3].choices = managerArr;
    updateQ[0].choices = employeeArr;
}

async function getRoles() {

    const select = `SELECT id, title, department_id FROM roleT `;
    let roleArr = []
    let roleEArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];

    for (let i in rows) {
        let q = {

            name: rows[i].title,
            value: rows[i].department_id
        }

        let e = {

            name: rows[i].title,
            value: rows[i].id
        }

        roleArr.push(q)
        roleEArr.push(e)
    }

    addEmQ[2].choices = roleEArr;
    addRoleQ[0].choices = roleArr;
    updateQ[1].choices = roleArr;
}

async function getDepartments() {

    const select = `SELECT id, name FROM deptT `;
    let deptArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];

    for (let i in rows) {

        let q = {
            name: rows[i].name,
            value: rows[i].id
        }

        deptArr.push(q)
    }

    addRoleQ[2].choices = deptArr;
    addDeptQ[0].choices = deptArr;
    updateQ[1].choices = deptArr;
}

function view(tableName) {

    var input = '';

    switch (tableName) {

        case 'deptT':
            input =
                `SELECT id AS ID, name AS Department_Name FROM deptT`;

            break;

        case 'roleT':

            input =
                `SELECT id AS ID, title AS Title, salary AS Salary
            FROM roleT`;

            break;

        case 'emT':

            input =
                `SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, roleT.title AS Title, deptT.name AS Department, roleT.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM emT e
            JOIN roleT
            ON e.role_id = roleT.id
            LEFT JOIN deptT
            ON roleT.department_id = deptT.id
            LEFT JOIN emT m
            ON e.manager_id = m.id
            ORDER BY ID`;

            break;
    }

    db.query(input,
        function (err, results) {
            if (err) return console.log(err);
            console.log()
            console.table(results)
        })

    menu()
}

function add(tableName) {

    switch (tableName) {

        case 'deptT':

            inquirer.prompt(addDeptQ)
                .then((response) => {
                    console.log(response)

                    const inputD = `INSERT INTO deptT (name)
                VALUES ('${response.name}')`

                    db.query(inputD)

                })
            .then(() => { menu()})


            break;

        case 'roleT':

            inquirer.prompt(addRoleQ)
                .then((response) => {
                    console.log(response)

                    const inputR = `INSERT INTO roleT (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, '${response.department}')`

                    db.query(inputR)

                })
             .then(() => { menu()})

            break;
        case 'emT':

            inquirer.prompt(addEmQ)
                .then((response) => {
                    console.log(response)

                    const inputE = `INSERT INTO emT (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role}', '${response.manager}')`

                    db.query(inputE)

                })
             .then(() => { menu()})

            break;
    }
}

async function update() {

    inquirer.prompt(updateQ)
        .then((response) => {
            console.log(response)
            const update = `UPDATE emT SET role_id = ${response.role} WHERE emT.id =${response.name}`;

            db.query(update)


        })

     .then(() => { menu(); })
}

async function menu() {

    getDepartments();
    getRoles();
    getEmployees();

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
                    value: update
                },
                {
                    name: 'Exit',
                    value: () => { process.exit() }
                }
            ]
        }
    ])
        .then((response) => {

            response.action.length === 2 ?
                response.action[0](response.action[1]) :
                response.action()


        })
        //.then(() => { menu() })



}

menu();