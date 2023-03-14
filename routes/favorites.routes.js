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

            var sql = "SELECT * FROM recipes, favorite WHERE rec_id = fav_rec_id AND fav_use_id = ? ORDER BY rec_title";
            console.log(visits);
            var params = [req.cookies.user];
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                if (rows.length < 1) {
                    res.status(400).send(`Es wurden keine favorisierten Rezepte gefunden.`);
                    return;
                }
                let most_viewed = [];
                if(req.cookies.user && visits[req.cookies.user]) {
                    let visitedRecipes = Object.entries(visits[req.cookies.user]).sort((a,b) => a[1] - b[1]);
                    most_viewed = (visitedRecipes.slice(0, 5));
                }
                let recipe_ids = [];
                for(let r of most_viewed) {
                    recipe_ids.push(r[0]);
                }
                console.log("recipe_ids: ", recipe_ids)   


                var sql = "SELECT * FROM recipes WHERE rec_id = ? OR rec_id = ? OR rec_id = ? OR rec_id = ? OR rec_id = ?";
                var params = [...recipe_ids];
                db.all(sql, params, (err, rows_n) => {
                    if(err) {
                        console.log(err)
                    }
                    console.log("rows: ", rows_n)       
                    res.render('pages/favorites_page', {
                        recipes: rows,
                        mostViewed: rows_n
                    });                
                }); 
            });
        });

        
    });
};