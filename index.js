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


async function menu() {

    getEmployees();
    getRoles();
    getDepartments();

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
                    value: () => { return }
                }
            ]
        }
    ])
        .then((response) => {

            response.action.length === 2 ?
                response.action[0](response.action[1]) :
                response.action()


        })

}

var addDeptQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select the name of the department: ',
        choices: []
    }
]
var addRoleQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select the name of the role: ',
        choices: []
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
        name: 'nameFirst',
        message: 'Enter the employee\'s first name: '
    },
    {
        type: 'input',
        name: 'nameLast',
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

var managerList = []

function view(tableName) {

    var input = '';

    switch (tableName) {

        case 'deptT':
            input =
                `SELECT * FROM ${tableName}`;

            break;

        case 'roleT':

            input =
                `SELECT id, title, salary
        FROM roleT`;

            break;
        case 'emT':


            input =
                `SELECT emT.id, emT.first_name, emT.last_name, roleT.title, deptT.name AS department, roleT.salary
            FROM emT
            JOIN roleT
            ON emT.role_id = roleT.id
            JOIN deptT
            ON roleT.department_id = deptT.id`;



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

                    const inputD = `INSERT INTO deptT (name)
                VALUES ('${response.name}')`

                    db.query(inputD)

                })
                .then(() => {
                    menu()
                })


            break;

        case 'roleT':
            inquirer.prompt(addRoleQ)
                .then((response) => {

                    const inputR = `INSERT INTO roleT (title, salary, department_id) VALUES ('${response.name}', ${response.salary}, '${response.department}')`

                    db.query(inputR)

                })
                .then(() => {
                    menu()
                })

            break;
        case 'emT':
            inquirer.prompt(addEmQ)
                .then((response) => {

                    const inputE = `INSERT INTO emT (nameFirst, nameLast, role, manager) VALUES ('${response.nameFirst}', '${response.nameLast}', '${response.role}', '${response.manager}')`

                    db.query(inputE)

                })
                .then(() => {
                    menu()
                })
            break;

    }
}

async function getEmployees() {

    const select = `SELECT id, last_name, first_name, manager_id FROM emT `;
    let employeeArr = []
    let managerArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];
    //console.log(rows);
    for (let i in rows) {
        const q = {
            name: rows[i].last_name + ' ' + rows[i].first_name,
            value: rows[i].id
        }
        employeeArr.push(q);

        const r = {
            name: rows[i].id,
            value: rows[i].last_name + ' ' + rows[i].first_name
        }
        if (rows[i] === null) managerArr.push(r)
        if(managerList[i] !== r[1]) managerList.push(r[1])
    }
    // console.log (list);
    addEmQ[3].choices = managerArr;
    updateQ[0].choices = employeeArr;
}

async function getRoles() {

    const select = `SELECT id, title FROM roleT `;
    let roleArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];
    //console.log(rows);
    for (let i in rows) {
        const q = {
            name: rows[i].title,
            value: rows[i].id
        }
        roleArr.push(q);
    }
    /// console.log (list);

    addEmQ[2].choices = roleArr;
    addRoleQ[0].choices = roleArr;
    updateQ[1].choices = roleArr;
}

async function getDepartments() {

    const select = `SELECT id, name FROM deptT `;
    let roleArr = []
    const selection = await db.promise().execute(select);
    const rows = selection[0];
    //console.log(rows);
    for (let i in rows) {
        const q = {
            name: rows[i].title,
            value: rows[i].id
        }
        roleArr.push(q);
    }
    /// console.log (list);

    addRoleQ[2].choices = roleArr;
    addDeptQ[0].choices = roleArr;
    updateQ[1].choices = roleArr;
}

async function update() {

    inquirer.prompt(updateQ)
        .then((response) => {

            const update = `UPDATE emT SET role_id = ${response.role} WHERE id =${response.name}`;

            db.query(update,

                function (err, results) {

                    if (err) {
                        console.log(err);
                    }
                }
            )
        })

        .then(() => { menu(); })
}

menu();