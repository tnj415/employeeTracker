const mysql = require('mysql2');

class Database {
    constructor(p_database) {
        this.db = mysql.createConnection(
            {
              host: 'localhost',
              // MySQL username,
              user: 'root',
              // MySQL password
              password: 'secretpass',
              database: p_database
            },
            console.log(`Connected to the employee_db database.`)
          );
          this.db.connect(function (err) {
            if (err) throw err;
          });
    }
    addDeptQ = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]
    addRoleQ = [
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
    addEmQ = [
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
    updateQ = [
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
    async getEmployees() {

        const select = `SELECT id, last_name, first_name FROM emT `;
        let fullName = []
        const selection = await db.promise().execute(select);
        const rows = selection[0];
        //console.log(rows);
        for (let i in rows) {
            const q = {
                name: rows[i].last_name + ' ' + rows[i].first_name,
                value: rows[i].id
            }
            fullName.push(q);
        }
        // console.log (list);

        return fullName;
    }
    async getRoles() {

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

        return roleArr;
    }
    view(tableName) {

        db.query(`SELECT * FROM ${tableName}`,

            function (err, results) {
                if (err) return console.log(err);
                console.table(results)
            })

        menu()
    }
    add(tableName) {

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
    async update() {


        updateQ[0].choices = await getEmployees();
        updateQ[1].choices = await getRoles();

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
}

module.exports = Database;