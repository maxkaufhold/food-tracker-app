CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    session_token VARCHAR(255)
);

CREATE TABLE groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE user_groups (
    user_group_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE privileges (
    priv_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE user_group_privs (
    user_group_priv_id INT AUTO_INCREMENT PRIMARY KEY,
    user_group_id INT NOT NULL,
    priv_id INT NOT NULL,
    FOREIGN KEY (user_group_id) REFERENCES user_groups(user_group_id),
    FOREIGN KEY (priv_id) REFERENCES privileges(priv_id)
);

CREATE TABLE foods (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    ean VARCHAR(13) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE inventory (
    inv_id INT AUTO_INCREMENT PRIMARY KEY,
    user_group_id INT NOT NULL,
    food_id INT NOT NULL,
    mhd date NOT NULL,
    FOREIGN KEY (user_group_id) REFERENCES user_groups(user_group_id),
    FOREIGN KEY (food_id) REFERENCES foods(food_id)
);

-- Testdaten für die Tabelle "users" (mit Namen als Passwort)
INSERT INTO users (username, password) VALUES
('john', '$2b$10$jw97Ne9rOEswuLt.0mB8hOhIRgq4BQSUYOJGC7TS3iCFdYu9NW4Zu'),
('jane', '$2b$10$7t2VblTiTWnFTlPSriQVTuANNM4Zl6rblfmQ7unn9shcg6koRihNi'),
('bob', '$2b$10$XV90pwwuDVoR3AWO0UeOb.C6Bq1g/HGcKwMSiSZGN7bPz9IB9D9oG');

-- Testdaten für die Tabelle "groups" (mit Familien- oder WG-Namen)
INSERT INTO groups (name) VALUES
('Familie Smith'),
('Familie Jones'),
('WG');

-- Testdaten für die Tabelle "user_groups"
INSERT INTO user_groups (user_id, group_id) VALUES
(1, 1),
(2, 2),
(3, 2),
(3, 3);

-- Testdaten für die Tabelle "privileges"
INSERT INTO privileges (name, description) VALUES
('Read', 'Read access'),
('Write', 'Write access'),
('Execute', 'Execute access');

-- Testdaten für die Tabelle "user_group_privs"
INSERT INTO user_group_privs (user_group_id, priv_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(3, 2),
(3, 3);

-- Testdaten für die Tabelle "foods"
INSERT INTO foods (ean, description) VALUES
('1234567890123', 'Apfel'),
('2345678901234', 'Banane'),
('3456789012345', 'Milch'),
('4567890123456', 'Orange'),
('5678901234567', 'Kartoffel'),
('6789012345678', 'Tomate'),
('7890123456789', 'Gurke'),
('8901234567890', 'Brot'),
('9012345678901', 'Butter'),
('0123456789012', 'Käse'),
('1234567890123', 'Ei'),
('2345678901234', 'Joghurt'),
('3456789012345', 'Müsli'),
('4567890123456', 'Pasta'),
('5678901234567', 'Reis'),
('6789012345678', 'Hähnchen'),
('7890123456789', 'Lachs'),
('8901234567890', 'Thunfisch'),
('9012345678901', 'Karotte'),
('0123456789012', 'Zwiebel'),
('1234567890123', 'Knoblauch'),
('2345678901234', 'Paprika'),
('3456789012345', 'Spinat'),
('4567890123456', 'Brokkoli'),
('5678901234567', 'Blumenkohl'),
('6789012345678', 'Kohl'),
('7890123456789', 'Radieschen'),
('8901234567890', 'Sellerie');

-- Testdaten für die Tabelle "inventory" (Verteilung der Lebensmittel auf die drei Inventare)
INSERT INTO inventory (user_group_id, food_id, mhd) VALUES
(1, 1, '2024-04-14'),
(2, 2, '2024-04-15'),
(3, 3, '2024-04-16'),
(1, 4, '2024-04-17'),
(2, 5, '2024-04-18'),
(3, 6, '2024-04-19'),
(1, 7, '2024-04-20'),
(2, 8, '2024-04-21'),
(3, 9, '2024-04-22'),
(1, 10, '2024-04-23'),
(2, 11, '2024-04-24'),
(3, 12, '2024-04-25'),
(1, 13, '2024-04-26'),
(2, 14, '2024-04-27'),
(3, 15, '2024-04-28'),
(1, 16, '2024-04-29'),
(2, 17, '2024-04-30'),
(3, 18, '2024-05-01'),
(1, 19, '2024-05-02'),
(2, 20, '2024-05-03'),
(3, 21, '2024-05-04'),
(1, 22, '2024-05-05'),
(2, 23, '2024-05-06'),
(3, 24, '2024-05-07'),
(1, 25, '2024-05-08');
