
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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

    }]).then(() => { console.log('hi') })
}

whatDoing()