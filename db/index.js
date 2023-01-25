const connection = require("./connection");

class DB {
    constructor(connection) {
      this.connection = connection;
    }

    //create employee
    addEmployee(employee) {
        return this.connection.promise().query(
          "INSERT INTO employee SET ?", employee);
      }

    // update employee's role
    updateEmployeeRole(employeeId, roleId) {
      return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
      );
    }

    // view all employees
    allEmployees() {
      return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
    }

    // update employee's manager
    updateEmployeeManager(employeeId, managerId) {
      return this.connection.promise().query(
        "UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]
      );
    }

    // view all employee's by dept
    allEmployeesByDepartment(departmentId) {
      return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
    }

    // delete an employee 
    removeEmployee(employeeId) {
      return this.connection.promise().query(
        "DELETE FROM employee WHERE id = ?", employeeId
      );
    }
  
    // create a new role
    createRole(role) {
      return this.connection.promise().query(
        "INSERT INTO role SET ?", role);
    }

    // view all managers
    allManagers(employeeId) {
      return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
        );
    }

    // view all roles
    allRoles() {
      return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
    }
  
    // delete a role 
    removeRole(roleId) {
      return this.connection.promise().query("DELETE FROM role WHERE id= ?", roleId);
    }

    // create a new department
    createDepartment(department) {
      return this.connection.promise().query(
        "INSERT INTO department SET ?", department);
    }

    // view all departments
    allDepartments() {
      return this.connection.promise().query(
        "SELECT department.id, department.name FROM department;"
      );
    }

    // view dept budget
    viewDepartmentBudget() {
      return this.connection.promise().query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
      );
    }
  
    // delete a department
    removeDepartment(departmentId) {
      return this.connection.promise().query(
        "DELETE FROM department WHERE id = ?", departmentId
        );
    }
}
  
  module.exports = new DB(connection);