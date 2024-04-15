<h1>Datenbank Schema</h1>
<br>
<ol>
  <li>XAMPP Apache Server und MySQL Starten</li>
  <li>phpmyadmin aufrufen mit <code>http://localhost/phpmyadmin/</code></li>
  <li>Auf der Linken Seite im Navigation Tree auf <code>Neu</code> drücken</li>
  <li>Im Feld Datenbankname den Namen <code>food_tracker_app_db</code> eingeben und auf Anlegen Button drücken</li>
  <li>Auf der Linken Seite im Navigation Tree auf <code>food_tracker_app_db</code> drücken</li>
  <li>In der oberen Leiste auf <code>SQL</code> drücken</li>
  <li>Code aus ./Backend/database.sql in das Textfeld kopieren und mit Ok Button bestätigen</li>
</ol>

<h1>Umgebung Starten</h1>
<br>
<ol>
  <li>XAMPP Apache Server und MySQL Starten</li>
  <li>Starten Des Backend Servers (Konsole öffnen und in ./Backend navigieren => <code>node server.js</code>)</li>
  <li>Starten des React Server (Konsole öffnen und in ./Frontend navigieren => <code>npm start</code>)</li>
  <li>React erkennt, dass auf Port 3000 belegt ist und möchte auf einem anderen Port starten (In der Konsole mit<code>y</code> bestätigen)</li>
  <li>Frontend ist erreichbar mit der url <code>http://localhost:3001/</code></li>
</ol>
