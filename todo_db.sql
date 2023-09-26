CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE todos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
	isCompleted boolean NOT NULL,
	createdAt datetime,
    updatedAt datetime
);
