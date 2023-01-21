-- Use company database --
USE company;

-- insert values for department, role, and employees --
INSERT INTO department (name)
VALUES  ("CEO"),
        ("MARKETING"),
        ("ENGINEERING"),
        ("SALES");

INSERT INTO role (title, salary, department_id)
VALUES  ("CEO", 500000, 1),
        ("MARKETING DIRECTOR", 125000, 2),
        ("SENIOR ENGINEER", 100000, 3),
        ("SALES DIRECTOR", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Sleve", "McDichael", 1, NULL),
        ("Karl", "Dandleton", 2, 1),
        ("Kim", "Sernandez", 3, 2),
        ("Bobson", "Dugnutt", 4, 3);