INSERT INTO department(id, dpt_name)
VALUES  (1,'Sales'),
        (2,'Engineering'),
        (3,'Finance'),
        (4,'Legal');

INSERT INTO emp_role(id, title, salary, department_id)
VALUES  (1,'Sales Lead',55000,1),
        (2,'Sales Person',50000,1),
        (3,'Lead Engineer',70000,2),
        (4,'Software Engineer',65000,2),
        (5,'Account Manager',80000,3),
        (6,'Accountant',70000,3),
        (7,'Legal Team Lead',85000,4),
        (8,'Lawyer',80000,4);
        
INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1,'Jane', 'Doe',1, null),
       (2,'Mike', 'Chan',2,1),
       (3,'Ashley', 'Rodriguez',3, null),
       (4,'Kevin', 'Tupik',4,3),
       (5,'Kunal', 'Singh',5, null),
       (6,'Malia', 'Brown',6,5),
       (7,'Sarah', 'Lourd',7, null),
       (8,'Tom', 'Allen',8,7),
