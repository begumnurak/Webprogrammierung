module.exports = function(app, db, visits) {
    app.get('/favorites', (req, res) => {

        var sql = "SELECT * FROM user WHERE use_session_cookie = ?";
        var params = [req.cookies.user];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            if (rows.length < 1) {
                res.status(400).send(`Es wurde kein Nutzer mit "${req.cookies.user}" gefunden.`);
                return;
            }
            let old_rows = rows;

            var sql = "SELECT * FROM recipes, favorite WHERE rec_id = fav_rec_id AND use_id = ? ORDER BY rec_title";
            console.log(visits);
            var params = [old_rows[0]];
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                if (rows.length < 1) {
                    res.status(400).send(`Es wurden keine favorisierten Rezepte gefunden.`);
                    return;
                }
                res.render('pages/favorites', {
                    recipes: rows
                });
            });
        });

        
    });
};