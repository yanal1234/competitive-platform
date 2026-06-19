DROP DATABASE IF EXISTS competitive_programming;

create database if not exists competitive_programming;

use competitive_programming;

create table if not exists Users(
user_id  int primary key AUTO_INCREMENT,
username varchar(50) UNIQUE not null,
email varchar(255) UNIQUE not null,
password varchar(255) not null,
rating int DEFAULT 0,
user_rank varchar(50),
bio text,
profile_picture varchar(255),
created_at datetime DEFAULT CURRENT_TIMESTAMP,
last_login DATETIME,
country VARCHAR(100)
);

create table if not exists Problems(
problem_id int primary key AUTO_INCREMENT,
title varchar(255) not null,
difficulty ENUM('Easy','Medium','Hard') not null,
points int DEFAULT 0,
statement text not null,
input_format text not null,
output_format  text not null,
created_at  datetime DEFAULT CURRENT_TIMESTAMP,
accepted_count int DEFAULT 0,
submission_count int DEFAULT 0
);

create table if not exists Submissions(
submission_id int primary key AUTO_INCREMENT,
language varchar(50)  not null,
verdict ENUM('Accepted',
'Wrong Answer',
'Time Limit Exceeded',
'Memory Limit Exceeded',
'Runtime Error',
'Compilation Error') not null,
execution_time float ,
memory_used FLOAT,
submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
user_id int not null,
problem_id int not null,
    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (problem_id)
        REFERENCES Problems(problem_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table if not exists Tags(
tag_id int primary key AUTO_INCREMENT,
tag_name VARCHAR(50) UNIQUE NOT NULL
);

create table if not exists Skills(
skill_id INT PRIMARY KEY AUTO_INCREMENT,
skill_name VARCHAR(100) UNIQUE NOT NULL
);

create table if not exists Contests(
contest_id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
start_time DATETIME NOT NULL,
end_time DATETIME NOT NULL,
status ENUM('Upcoming','Running','Finished') DEFAULT 'Upcoming'
);

create table if not exists Recommendations(
recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
score DECIMAL(5,2) NOT NULL,
reason text,
is_viewed BOOLEAN DEFAULT FALSE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
user_id INT NOT NULL,
problem_id INT NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (problem_id)
        REFERENCES Problems(problem_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table if not exists UserSkills(
mastery_score DECIMAL(5,2) DEFAULT 0,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INT NOT NULL,
skill_id INT NOT NULL,
PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES Skills(skill_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table if not exists ProblemTags(
problem_id INT NOT NULL,
tag_id INT NOT NULL,
PRIMARY KEY (problem_id, tag_id),
    FOREIGN KEY (problem_id)
        REFERENCES Problems(problem_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (tag_id)
        REFERENCES Tags(tag_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table if not exists ContestParticipants(
score INT DEFAULT 0,
contest_rank INT,
user_id INT NOT NULL,
contest_id INT NOT NULL,
PRIMARY KEY (user_id, contest_id),
    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (contest_id)
        REFERENCES Contests(contest_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table if not exists ContestProblems(
problem_order CHAR(1) NOT NULL,
problem_id INT NOT NULL,
contest_id INT NOT NULL,
PRIMARY KEY (contest_id, problem_id),
UNIQUE(contest_id, problem_order),
    FOREIGN KEY (problem_id)
        REFERENCES Problems(problem_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (contest_id)
        REFERENCES Contests(contest_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
