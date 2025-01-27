DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS registers;
DROP TABLE IF EXISTS QUESTION;
DROP TABLE IF EXISTS DATABASE;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS FIELD;

CREATE TABLE FIELD(
    id INTEGER CONSTRAINT pk_field PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50)
);

CREATE TABLE USER(
    id INTEGER CONSTRAINT pk_user PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(50),
    name VARCHAR(50),
    mail VARCHAR(50),
    password VARCHAR(20),
    avatar VARCHAR(50),
    is_admin LOGICAL,
    id_field INTEGER NOT NULL,
    CONSTRAINT fk_user_field FOREIGN KEY(id_field) REFERENCES FIELD(id)
);

CREATE TABLE DATABASE(
    id INTEGER CONSTRAINT pk_database PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    description VARCHAR(200),
    filename VARCHAR(50),
    date_created DATE,
    date_updated DATE,
    id_user INTEGER NOT NULL,
    CONSTRAINT fk_database_user FOREIGN KEY(id_user) REFERENCES USER(id)
);

CREATE TABLE QUESTION(
    id INTEGER CONSTRAINT pk_question PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    expected_result TEXT,
    best_answer TEXT,
    id_database INTEGER NOT NULL,
    CONSTRAINT fk_question_database FOREIGN KEY(id_database) REFERENCES DATABASE(id)
);

CREATE TABLE registers(
    id_user INTEGER,
    id_database INTEGER,
    CONSTRAINT pk_registers PRIMARY KEY(id_user, id_database),
    CONSTRAINT fk_registers_user FOREIGN KEY(id_user) REFERENCES USER(id),
    CONSTRAINT fk_registers_database FOREIGN KEY(id_database) REFERENCES DATABASE(id)
);

CREATE TABLE answers(
    id_user INTEGER,
    id_question INTEGER,
    difficulty DECIMAL(2,1),
    saw_the_correction LOGICAL,
    trials_number INTEGER,
    CONSTRAINT pk_answers PRIMARY KEY(id_user, id_question),
    CONSTRAINT fk_answers_user FOREIGN KEY(id_user) REFERENCES USER(id),
    CONSTRAINT fk_answers_question FOREIGN KEY(id_question) REFERENCES QUESTION(id)
);
