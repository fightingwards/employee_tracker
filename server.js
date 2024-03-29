const db = require('./db');
const inquirer = require('inquirer');
const main = require('asciiart-logo');

require('console.table');

init();
function init() {
  const mainText = main({ name: "Employee Manager", logoColor: "bold-cyan", borderColor: "bold-yellow"}).render();
  console.log(mainText);
  promptUser();
}

function promptUser() {
  inquirer.prompt(
    [ 
      {
        type: 'list',
        name: 'choice',
        message: 'Please select an option',
        choices: [
          { name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          { name: 'View ALL Employees',
            value: 'VIEW_EMPLOYEES'
          },
          { name: 'Update Employee Manager',
            value: 'UPDATE_EMPLOYEE_MANAGER'
          },
          { name: 'Remove Employee',
            value: 'REMOVE_EMPLOYEE'
          },
          { name: "Add Role",
            value: "ADD_ROLE"
          },
          { name: 'View ALL Roles',
            value: 'VIEW_ROLES'
          },
          { name: 'Update Employee Role',
            value: 'UPDATE_EMPLOYEE_ROLE'
          },
          { name: 'Remove Role',
            value: 'REMOVE_ROLE'
          },
          { name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          { name: 'View ALL Departments',
            value: 'VIEW_DEPARTMENTS'
          },
          { name: 'View ALL Employees by Department',
            value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
          },
          { name: 'View Department Budget',
            value: 'VIEW_DEPARTMENT_BUDGET'
          },
          { name: 'Remove Department',
            value: 'REMOVE_DEPARTMENT'
          },
          { name: 'Quit',
            value: 'QUIT'
          }
        ]
      }
    ]).then(res => {
            let choice =res.choice; 
            switch (choice) {
              case 'ADD_EMPLOYEE': addEmployee();
                break;
              case 'VIEW_EMPLOYEES': viewEmployees();
                break;
              case 'UPDATE_EMPLOYEE_MANAGER': updateEmployeeManager();
                break;
              case 'UPDATE_EMPLOYEE_ROLE': updateEmployeeRole();
                break;
              case 'REMOVE_EMPLOYEE': removeEmployee();
                break;
              case 'ADD_ROLE': addRole();
                break;
              case 'VIEW_ROLES': viewRoles();
                break;
              case 'REMOVE_ROLE': removeRole();
                break;
              case 'ADD_DEPARTMENT': addDepartment();
                break;
              case 'VIEW_DEPARTMENTS': viewDepartments();
                break;
              case 'VIEW_EMPLOYEES_BY_DEPARTMENT': viewEmployeesByDepartment();
                break;
              case 'VIEW_DEPARTMENT_BUDGET': viewDepartmentBudget();
                break;
              case 'REMOVE_DEPARTMENT': removeDepartment();
                break;
              default:
                quit();  
            }
          })
}

//add employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      message: "Enter employee's first name:"
    },
    {
      name: 'last_name',
      message: "Enter employee's last name:"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.allRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: "Select employee's role",
            choices: roleChoices
          })
          .then(res => {
            let roleId = res.roleId;
              db.allEmployees()
          .then(([rows]) => {
            let employees = rows;
              const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
                }));
                managerChoices.unshift({ name: "None", value: null });

          inquirer.prompt({
            type: 'list',
            name: 'managerId',
            message: "Select employee's manager:",
            choices: managerChoices
          })
            .then(res => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
              }
            db.addEmployee(employee);
            })
            .then(() => console.log(`Employee ${firstName} ${lastName} has been added!`))
            .then(() => promptUser())
            })
            })
        })
    })
}

//view emp by dept
function viewEmployeesByDepartment() {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select department you wish to see employees',
          choices: departmentChoices
        }
      ])
        .then(res => db.allEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log('\n');
          console.table(employees);
        })
        .then(() => promptUser())
    });
}

// View all employees
function viewEmployees() {
  db.allEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    }).then(() => promptUser());
    }

//add role
function addRole() {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          name: 'title',
          message: 'Enter name of new role'
        },
        {
          name: 'salary',
          message: 'Enter role salary:'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select role department:',
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Role ${role.title} has been added!`))
            .then(() => promptUser())
        })
    })
}

//view all roles
function viewRoles() {
  db.allRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    }).then(() => promptUser());
}

//Delete a role
function removeRole() {
  db.allRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message:
            "Select role to remove",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log("Role has been removed!"))
        .then(() => promptUser())
    })
}

//add department
function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      message: 'Enter new department name:'
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Department ${name.name} has been added!`))
        .then(() => promptUser())
    })
}

//view department budget
function viewDepartmentBudget() {
  db.viewDepartmentBudget()
  .then(([rows]) => {
    let budget = rows;
    console.log('\n');
    console.log(budget);
  })
  .then(() => promptUser());
}

//view all departments
function viewDepartments() {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    }).then(() => promptUser());
}

// Delete a department
function removeDepartment() {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt({
        type: 'list',
        name: 'departmentId',
        message:
          "Select department to remove",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log("Removed department from the database"))
        .then(() => promptUser())
    })
}

// quit
function quit() {
  console.log("Goodbye");
  process.exit();
}