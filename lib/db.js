// const connection = require('../connection')
// const i = require('inquirer')

// const addDeptQ = [
//     {
//         type: 'input',
//         name: 'name',
//         message: 'Enter the name of the department:'
//     }
// ]
// const addRoleQ = [
//     {
//         type: 'input',
//         name: 'name',
//         message: 'Enter the name of the role:'
//     },
//     {
//         type: 'input',
//         name: 'salary',
//         message: 'Enter the salary of the role'
//     },
//     {
//         type: 'input',
//         name: 'department',
//         message: 'Enter the department of the role:'
//     }
// ]
// const addEmQ = [
//     {
//         type: 'input',
//         name: 'nameFirst',
//         message: 'Enter the employee\'s first name:'
//     },
//     {
//         type: 'input',
//         name: 'nameLast',
//         message: 'Enter the employee\'s last name:'
//     },
//     {
//         type: 'input',
//         name: 'role',
//         message: 'Enter the employee\'s role:'
//     },
//     {
//         type: 'input',
//         name: 'manager',
//         message: 'Enter the employee\'s manager:'
//     }
// ]
// const updateQ = [
//     {
//         type: 'list',
//         name: 'name',
//         message: 'Select an employee:',
//         choices: []

//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: 'select a role:',
//         choices: []
//     }
// ]

// class Database {
//     constructor() { this.connection = connection }
    
//     async getEmployees() {

//         const select = `SELECT id, last_name, first_name FROM emT `;
//         let fullName = []
//         const selection = await connection.promise().execute(select);
//         const rows = selection[0];
//         //console.log(rows);
//         for (let i in rows) {
//             const q = {
//                 name: rows[i].last_name + ' ' + rows[i].first_name,
//                 value: rows[i].id
//             }
//             fullName.push(q);
//         }
//         // console.log (list);

//         return fullName;
//     }
//     async getRoles() {

//         const select = `SELECT id, title FROM roleT `;
//         let roleArr = []
//         const selection = await connection.promise().execute(select);
//         const rows = selection[0];
//         //console.log(rows);
//         for (let i in rows) {
//             const q = {
//                 name: rows[i].title,
//                 value: rows[i].id
//             }
//             roleArr.push(q);
//         }
//         /// console.log (list);

//         return roleArr;
//     }

// }

// module.exports = Database;