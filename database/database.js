/*
In dieser Datei wird die Datenbank erstellt.
Zudem werden, sollten die Datenbank oder die Tabellen noch nicht vorhanden sein, einige Werte in die Tabellen eingefügt (nur zum Testen).
*/

var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./database/db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE recipes (
            rec_id INTEGER PRIMARY KEY AUTOINCREMENT,
            rec_category_id INTEGER NOT NULL,
            rec_title text NOT NULL, 
            rec_needed_time text NOT NULL,
            rec_instructions text NOT NULL,
            rec_ingredients text NOT NULL
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created
            }
        });
        db.run(`CREATE TABLE categories (
            cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
            cat_name text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var sql = 'INSERT INTO categories (cat_id ,cat_name) VALUES (?,?)';
                db.run(sql, ["1","Süß"]);
                db.run(sql, ["2","Herzhaft"]);
            }
        });
    }
});


module.exports = db;