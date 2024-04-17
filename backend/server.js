const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
const port = 3000;

const cors = require('cors');

// MySQL Verbindungseinstellungen
const dbConfig = {
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'food_tracker_app_db'
};

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur MySQL-Datenbank: ' + err.stack);
        return;
    }
    console.log('Er folgreich mit MySQL-Datenbank verbunden als ID ' + connection.threadId);
});

// Funktion zum Ausführen von SQL-Abfragen
async function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

// Middleware für JSON-Parser
app.use(express.json());

// Verwende cors Middleware vor den Routen
app.use(cors());

app.use('/login', async (req, res) => {
    try {
        const stmt = `SELECT user_id, password, session_token FROM users WHERE username = ${connection.escape(req.body.logUsername)}`;
        const user = await executeQuery(stmt);

        // Überprüfen, ob ein Benutzer mit dem angegebenen Benutzernamen gefunden wurde
        if (user.length === 0) {
            res.status(401).send('Ungültige Anmeldeinformationen');
            return;
        }

        const hashedPasswordFromDB = user[0].password;

        // Vergleichen des eingegebenen Passworts mit dem in der Datenbank gespeicherten Passwort
        const passwordMatch = await bcrypt.compare(req.body.logPassword, hashedPasswordFromDB);
        if (!passwordMatch) {
            res.status(401).send('Ungültige Anmeldeinformationen');
            return;
        }

        // Wenn das Passwort übereinstimmt, ein neues Session-Token generieren und in der Datenbank speichern
        const newSessionToken = generateSessionToken();
        const updateSessionTokenStmt = `UPDATE users SET session_token = ${connection.escape(newSessionToken)} WHERE user_id = ${connection.escape(user[0].user_id)}`;
        
        await executeQuery(updateSessionTokenStmt);
        

        // Antwort mit dem Session-Token senden
        res.send({
            user_id: user[0].user_id,
            token: newSessionToken
        });
    } catch (err) {
        console.error('Fehler beim Login: ' + err.message);
        res.status(500).send('Interner Serverfehler');
    }
});



app.use('/register', async (req, res) => {
    try {
        const { regUsername, regPassword, regConfirmPassword } = req.body;

        // Vergleichen des Passworts und der Bestätigung
        if (regPassword !== regConfirmPassword) {
            res.status(400).send('Die Passwörter stimmen nicht überein');
            return;
        }

        // Verschlüsselung des Passworts
        const hashedPassword = await encryptPassword(regPassword);

        // Generieren eines Session-Tokens
        const token = generateSessionToken();

        // Eintragen des Benutzers in die Datenbank
        const insstmt = `INSERT INTO users (username, password, session_token) VALUES (${connection.escape(regUsername)}, ${connection.escape(hashedPassword)}, ${connection.escape(token)})`;
        await executeQuery(insstmt);

        const stmt = `SELECT user_id, password, session_token FROM users WHERE username = ${connection.escape(regUsername)}`;
        const user = await executeQuery(stmt);

        if (user.length === 0) {
            res.status(400).send('Fehler beim anlegen des Benutzers!');
            return;
        }

        res.status(201).send({
            user_id: user[0].user_id,
            token: user[0].token
        });
    } catch (error) {
        console.error('Fehler beim Registrieren: ' + error.message);
        res.status(500).send('Interner Serverfehler');
    }
});

app.use('/logout', async (req, res) => {
    try {
        const { token } = req.body;

        // Eintragen des Benutzers in die Datenbank
        const stmt = `UPDATE users set session_token = null where session_token = ${connection.escape(token)}`;
        await executeQuery(stmt);
        res.status(200).send('Erfolgreich augeloggt');

    } catch (error) {
        console.error('Fehler beim Registrieren: ' + error.message);
        res.status(500).send('Interner Serverfehler');
    }
});

app.get('/api/data/profil', async (req, res) => {
    try {
        // Daten aus MySQL abrufen und senden
        res.send(await executeQuery(`SELECT * FROM users where user_id = ${connection.escape(req.query.user_id)}`));
    } catch (err) {
        res.status(500).send('Interner Serverfehler');
    }
});

app.get('/api/data/groups', async (req, res) => {
    try {
        // Daten aus MySQL abrufen und senden
        const stmt = `select ug.user_group_id, gr.name from groups gr join user_groups ug on gr.group_id = ug.group_id where ug.user_id = ${connection.escape(req.query.user_id)}`;
        res.send(await executeQuery(stmt));
    } catch (err) {
        res.status(500).send('Interner Serverfehler');
    }
});

app.get('/api/data/inventory', async (req, res) => {
    try {
        // Daten aus MySQL abrufen und senden
        const stmt = `select inv.inv_id, fo.description, inv.mhd from inventory inv join foods fo on inv.food_id = fo.food_id where inv.user_group_id = ${connection.escape(req.query.user_group_id)}`;
        res.send(await executeQuery(stmt));
    } catch (err) {
        res.status(500).send('Interner Serverfehler');
    }
});

app.post('/api/data/inventory/delete', async (req, res) => {
    try {
        // Daten aus MySQL abrufen und senden
        const stmt = `delete from inventory where inv_id = ${connection.escape(req.body.inv_id)}`;
        if(await executeQuery(stmt)){
            res.status(201).send('Benutzer erfolgreich angelegt');
        } else {
            res.status(201).send('Fehler beim anlegen des Benutzers');
        }
    } catch (err) {
        res.status(500).send('Interner Serverfehler');
    }
});

app.post('/api/data/user/updatePassword', async (req, res) => {
    try {
        // Daten aus MySQL abrufen und senden
        const hashedPassword = await encryptPassword(user.username);
        const stmt = `UPDATE users SET password = '${connection.escape(hashedPassword)}' WHERE user_id = ${connection.escape(req.body.user_id)}`;
        if(await executeQuery(stmt)){
            res.status(201).send('Passwort erfolgreich geändert');
        } else {
            res.status(201).send('Fehler beim Ändern des Passworts');
        }
    } catch (err) {
        res.status(500).send('Interner Serverfehler');
    }
});

async function encryptPassword(password) {
    try {
        const saltRounds = 10; // Anzahl der Runden für die Salt-Generierung
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Fehler beim Verschlüsseln des Passworts: ' + error.message);
    }
}

function generateSessionToken() {
    try {
        const tokenLength = 32; // Länge des Session-Tokens in Bytes
        return crypto.randomBytes(tokenLength).toString('hex');
    } catch (error) {
        throw new Error('Fehler beim Generieren des Session-Tokens: ' + error.message);
    }
}


// Server starten
app.listen(port, () => {
    console.log(`Der Server läuft auf http://localhost:${port}`);
});