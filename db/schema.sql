DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE departmentTable (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roleTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL, 
department_id INT  NULL ,
FOREIGN KEY(department_id)
REFERENCES departmentTable(id)
ON DELETE SET NULL
);

CREATE TABLE employeeTable (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL, 
role_id INT NULL,
manager_id INT NULL,
FOREIGN KEY (role_id)
REFERENCES roleTable(id)
ON DELETE SET NULL,

FOREIGN KEY (manager_id)
REFERENCES employeeTable(id)
ON DELETE SET NULL
);