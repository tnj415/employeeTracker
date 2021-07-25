const menu_questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'view all departments',
            'view all departments',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'
        ]
    }
]

const addDepartmentQ = [
    {
        type: 'input',
        name,
        message: 'Enter the name of the department:'
    }
]

const addRoleQ = [
    {
        type: 'input',
        name,
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