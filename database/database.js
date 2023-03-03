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
                cat_name text
            )`
            , (err) => {
                if (err) {

                } else {
                    db.run("INSERT INTO categories (cat_id, cat_name) VALUES (1, 'Süß')");
                    db.run("INSERT INTO categories (cat_id, cat_name) VALUES (2, 'Herzhaft')");
                }
            });
        db.run(`
            CREATE TABLE recipes (
                rec_id INTEGER PRIMARY KEY AUTOINCREMENT,
                rec_cat_id INTEGER NOT NULL,
                rec_title text NOT NULL, 
                rec_needed_time text NOT NULL,
                rec_instructions text NOT NULL,
                rec_ingredients text NOT NULL,
                rec_image_link text
            )`
            , (err) => {
                if (err) {

                } else {
                    let sql = "INSERT INTO recipes (rec_id, rec_cat_id, rec_title, rec_needed_time, rec_instructions, rec_ingredients) VALUES (?, ?, ?, ?, ?, ?)";
                    let instructions = `Ofen auf 180 Grad vorheizen. Mehl, Zucker, Eier, Öl, Milch, Backpulver und Zimt in eine 
                        Schüssel geben und zu einem Teig verrühren. Möhren schälen und raspeln. Möhren unter den Teig rühren. Teig 
                        in eine gefettete Kuchenform geben und für 30-35 Minuten backen. Abkühlen lassen und nach Belieben verzieren.`;

                    for(let i = 0; i < 10; i++) {
                        let params = [i, 1, "Möhrenkuchen" + i, "1 Stunde", instructions, "Mehl,Zucker,Eier,Möhren,Öl,Milch,Backpulver,Zimt"];
                        db.run(sql, params);
                    }
                    for(let i = 0; i < 10; i++) {
                        let params = [10+i, 2, "Möhrenkuchen" + 1+i, "1 Stunde", instructions, "Mehl,Zucker,Eier,Möhren,Öl,Milch,Backpulver,Zimt"];
                        db.run(sql, params);
                    }
                }
            });
        db.run(`
            CREATE TABLE user (
                use_id INTEGER PRIMARY KEY AUTOINCREMENT,
                use_name text NOT NULL,
                use_session_cookie text NOT NULL
            )`
            , (err) => {});
        db.run(`
            CREATE TABLE favorite (
                fav_use_id INTEGER NOT NULL,
                fav_rec_id INTEGER NOT NULL,
            )`
            , (err) => {});
        db.run(`
            CREATE TABLE comment (
                com_id INTEGER PRIMARY KEY NOT NULL,
                com_text text NOT NULL,
                com_rec_id INTEGER NOT NULL,
                com_use_id INTEGER NOT NULL,
            )`
            , (err) => {});
    }
});

module.exports = db;