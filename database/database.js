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
            rec_category_id INTEGER,
            rec_title text, 
            rec_needed_time text,
            rec_instructions text,
            rec_ingredients text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var sql = 'INSERT INTO recipes (rec_title, rec_needed_time, rec_instructions, rec_ingredients, rec_category_id) VALUES (?,?,?,?,?)';
                for (let i = 0; i < 10; i++) {
                    db.run(sql, ["Süßes Wasser","Nicht sooo lang","Warmes Wasser mit kaltem Wasser mischen, dann zusammen aufkochen, zum Schluss mit dem Eis hübsch anrichten und servieren","Warmes Wasser, kaltes Wasser, Eis","1"]);
                }
                for (let i = 0; i < 5; i++) {
                    db.run(sql, ["Herzhaftes Wasser","Nicht sooo lang","Warmes Wasser mit kaltem Wasser mischen, dann zusammen aufkochen, zum Schluss mit dem Eis hübsch anrichten und servieren","Warmes Wasser, kaltes Wasser, Eis","2"]);
                }
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