
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
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
                inquirer.prompt([{
                    type: 'input',
                    name: "dpt_name",
                    message: 'what is the name of the department?'

                }]).then((answer) => {

                    db.query('INSERT INTO department SET ?', answer, function (err, results) {
                        if (err) throw err
                        console.table(results); whatDoing()
                    })
                });

                break;

            case 'add-a-role':
                inquirer.prompt([{
                    type: 'input',
                    name: "title",
                    message: 'what is the name of the role?'
                },
                {
                    type: 'number',
                    name: "salary",
                    message: 'what is the salary for the role?'
                },
                {
                    type: 'list',
                    name: "department_id",
                    message: 'which department does the role belong to?',
                    choices: ['Sales', 'Engineering', 'Finance', 'Legal']

                }]).then(async (answer) => {
                    const [rows] = await db.promise().query(`SELECT id FROM department WHERE dpt_name = '${answer.department_id}'`)
                    return { ...answer, id: rows[0].id }
                }).then((answer) => {
                    const {
                        title,
                        salary,
                        id
                    } = answer

                    db.query('INSERT INTO emp_role (title, salary, department_id) VALUES (?,?,?)', [title, salary, id], function (err, results) {
                        if (err) throw err
                        console.table(results); whatDoing()
                    })
                });

                break;

            case 'add-an-employee':
                inquirer.prompt([{
                    type: 'input',
                    name: "first_name",
                    message: 'what is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: "last_name",
                    message: 'what is the last name of the employee?'

                },
                {
                    type: 'input',
                    name: "role_id",
                    message: 'what is the role of the employee?'

                },
                {
                    type: 'input',
                    name: "manager_id",
                    message: 'who is managing the employee?'

                }]).then(async (answer) => {
                    const [rows] = await db.promise().query(`SELECT id FROM emp_role WHERE title = '${answer.role_id}'`)
                    //console.log(rows);
                    return { ...answer, id: rows[0].id }
                }).then((answer) => {
                    const {
                        first_name,
                        last_name,
                        id,
                        manager_id
                    } = answer
                    //console.log(role_id)

                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)', [first_name, last_name, id, manager_id], function (err, results) {
                        if (err) throw err
                        console.table(results); whatDoing()
                    })
                });

                break;

            case 'update-an-employee-role':
                inquirer.prompt([{
                    type: 'number',
                    name: "id",
                    message: "what is the employee id?"
                },
                {
                    type: 'number',
                    name: 'role_id',
                    message: "what is their new role id?"

                }]).then((answer) => {
                    const {
                        id,
                        role_id
                    } = answer

                    db.query("UPDATE employee SET role_id = ? WHERE id =?", [role_id, id], function (err, results) {
                        console.log(answer)
                        if (err) throw err
                        console.table(results); whatDoing()
                    })
                });

                break;

            default:
                return process.exit()


        }
    })
}

whatDoing()