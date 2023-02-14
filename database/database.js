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
        db.run(`CREATE TABLE categories (
                cat_id INTEGER PRIMARY KEY AUTOINCREMENT,
                cat_name text,
                cat_description text
            );

            CREATE TABLE recipes (
                rec_id INTEGER PRIMARY KEY AUTOINCREMENT,
                FOREIGN KEY(rec_cat_id) REFERENCES category(cat_id),
                rec_title text NOT NULL, 
                rec_needed_time text NOT NULL,
                rec_instructions text NOT NULL,
                rec_ingredients text NOT NULL,
                rec_image blob NOT NULL
            );
            
            CREATE TABLE user (
                use_id INTEGER PRIMARY KEY AUTOINCREMENT,
                use_name text NOT NULL,
                use_session_cookie text NOT NULL
            );
            
            CREATE TABLE favorite (
                FOREIGN KEY(fav_use_id) REFERENCES user(use_id) ,
                FOREIGN KEY(fav_rec_id) REFERENCES recipe(rec_id) 
            );
            
            CREATE TABLE comment (
                com_id INTEGER PRIMARY KEY NOT NULL,
                com_text text NOT NULL,
                FOREIGN KEY(com_rec_id) REFERENCES recipe(rec_id),
                FOREIGN KEY(com_use_id) REFERENCES user(use_id)
            );`
        );
    }
});


module.exports = db;