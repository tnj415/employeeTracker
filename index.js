const inquirer = require('inquirer');
const Database = require('./lib/db');
const db = new Database('employee_db');

async function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: [db.view, 'deptT']
                },
                {
                    name: 'View all roles',
                    value: [db.view, 'roleT']
                },
                {
                    name: 'View all employees',
                    value: [db.view, 'emT']
                },
                {
                    name: 'Add a department',
                    value: [db.add, 'deptT']
                },
                {
                    name: 'Add a role',
                    value: [db.add, 'roleT']
                },
                {
                    name: 'Add an employee',
                    value: [db.add, 'emT']
                },
                {
                    name: 'Update an employee role',
                    value: db.update
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

menu();
 
