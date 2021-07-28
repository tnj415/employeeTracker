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
    else{
        console.log("connected to MySQL");
    }
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

var updateQ = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee:',
        choices: []

    },
    {
        type: 'list',
        name: 'role',
        message: 'select a role:',
        choices: []
    }
]

function view(tableName) {

    db.query(`SELECT * FROM ${tableName}`,

        function (err, results) {
            if (err) return console.log(err);
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
        case 'empT':
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

async function getEmployees () {

    const select = `SELECT id, last_name, first_name FROM emT `;
    let fullName = []
    const selection = await db.promise().execute(select);
    const rows= selection[0];
    //console.log(rows);
    for (let i in rows) {
        const q = {
            name: rows[i].last_name + ' ' + rows[i].first_name,
            value: rows[i].id
        }
        fullName.push (q);
    }
    // console.log (list);

    return fullName;
}

async function getRoles () {

    const select = `SELECT id, title FROM roleT `;
    let roleArr = []
    const selection = await db.promise().execute(select);
    const rows= selection[0];
    //console.log(rows);
    for (let i in rows) {
        const q = {
            name: rows[i].title,
            value: rows[i].id
        }
        roleArr.push (q);
    }
   /// console.log (list);

    return roleArr;
}

async function update() {


updateQ[0].choices= await getEmployees();
updateQ[1].choices= await getRoles();

    inquirer.prompt(updateQ)
        .then((response) => {
            
            const update =  `UPDATE emT SET role_id = ${response.role} WHERE id =${response.name}`;
            
            db.query( update,

                function (err, results) {
    
                    if (err) {
                        console.log(err);
                    }
                }
            )
        })
        
 .then(() => {menu();})
}

menu();
 