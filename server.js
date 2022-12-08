
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
);

function whatDoing() {
    inquirer.prompt([{
        type: 'list',
        message: 'what would you like to do?',
        name: 'start',
        choices: ['view-all-departments', 'view-all-roles', 'view-all-employees', 'add-a-department', 'add-a-role', 'add-an-employee', 'update-an-employee-role']

    }]).then((answer) => {
        switch (answer.start) {
            case 'view-all-departments':
                db.query('SELECT * FROM department', function (err, results) {
                   if (err) throw err
                    console.table(results); whatDoing()
                }); 
            break;

            case 'view-all-roles':
                db.query('SELECT * FROM emp_role', function (err, results) {
                    if (err) throw err
                     console.table(results); whatDoing()
                 });

            break;

            case 'view-all-employees':
                db.query('SELECT * FROM employee', function (err, results) {
                    if (err) throw err
                     console.table(results); whatDoing()
                 });

            break;

            case 'add-a-department':

            break;

            case 'add-a-role':

            break;

            case 'add-an-employee':

            break;

            case 'update-an-employee-role':

            break;

            default: 
            return process.exit()


        }
    })
}

whatDoing()