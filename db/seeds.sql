-- Use company database --
USE company;

-- Values for department, role, and employees --
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Sales Person", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Sleve", "McDichael", 1, NULL),
        ("Karl", "Dandleton", 2, 1),
        ("Kim", "Sernandez", 3, NULL),
        ("Onson", "Sweemy", 4, 3),
        ("Darryl", "Archideld", 5, NULL),
        ("Rey", "McSriff", 6, 5),
        ("Mary", "McRlwain", 7, NULL),
        ("Bobson", "Dugnutt", 8, 7);