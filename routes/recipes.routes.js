module.exports = function(app, db) {

    app.get('/recipes/:category', (req, res) => {
        var sql = "SELECT * FROM recipes, categories WHERE rec_cat_id = cat_id AND cat_name = ? ORDER BY rec_title";
        var params = [req.params.category];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            if (rows.length < 1) {
                res.status(400).send(`Es wurden keine Rezepte zur Kategorie "${req.params.category}" gefunden.`);
                return;
            }
            res.render('pages/recipe_category_page', {
                category: req.params.category,
                recipes: rows
            });
        });
    });

    app.get('/add_recipe', (req, res) => {
        var sql = "SELECT * FROM categories ORDER BY cat_name";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.render('pages/add_recipe_page', {
                categories: rows
            });
        });
    });

    app.post('/add_recipe_to_favorites', (req, res) => {
        var sql = "INSERT INTO favorite (fav_use_id, fav_rec_id) VALUES (?,?)";
        console.log(req.body);
        if (req.body.fav_rec_id && req.body.fav_use_id) {
            var params = [req.body.fav_use_id, req.body.fav_rec_id];
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({"error": err.message});
                    return;
                }
                //res.redirect('/add_recipe');
            })
        }
    });

    app.delete('/remove_recipe_from_favorites', (req, res) => {
        var sql = "DELETE FROM favorite WHERE fav_rec_id = ? AND fav_use_id = ?";
        if (req.body.fav_req_id && req.body.fav_use_id) {
            var params = [req.body.fav_use_id, req.body.fav_req_id];
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                //res.reload();
            })
        }
    });

    app.post('/add_recipe', (req, res) => {
        var sql = "INSERT INTO recipes (rec_title, rec_ingredients, rec_needed_time, rec_instructions, rec_cat_id) VALUES (?,?,?,?,?)";
        if (req.body.title && req.body.needed_time && req.body.instructions && req.body.ingredients && req.body.category) {
            var params = [req.body.title, req.body.ingredients, req.body.needed_time, req.body.instructions, req.body.category];
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.redirect('/add_recipe');
            });
        } else {
            res.status(400).json({ "error": "empty parameters" });
        }
    });

    app.post('/add_recipe_json', (req, res) => {
        var sql = "INSERT INTO recipes (rec_title, rec_ingredients, rec_needed_time, rec_instructions, rec_cat_id) VALUES (?,?,?,?,?)";
        if (req.body.json && req.body.category) {
            let json = JSON.parse(req.body.json);
            var params = [json.title, json.ingredients, json.needed_time, json.instructions, req.body.category];
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.redirect('/add_recipe');
            });
        } else {
            res.status(400).json({ "error": "empty parameters" });
        }
    });

    app.get('/recipe/:recipe', (req, res) => {
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
            let user_rows = rows;
            sql = "SELECT * FROM recipes WHERE rec_title = ?";
            params = [req.params.recipe];
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                if (rows.length < 1) {
                    res.status(400).send(`Es wurde kein Rezepte namens "${req.params.recipe}" gefunden.`);
                    return;
                }
                let recipe_rows = rows;

                sql = "SELECT * FROM favorite WHERE rec_id = ?";
                params = [req.params.recipe.rec_id];
                var is_favorite = true; 
                db.all(sql, params, (err, rows) => {
                    if (err) {
                        res.status(400).json({"error":err.message});
                        return;
                    }
                    if (rows.length < 1) {
                        is_favorite = false;
                        return;
                    }
                })
                res.render('pages/recipe', {
                    recipe: recipe_rows[0],
                    user: user_rows[0],
                    favorite: is_favorite,
                });
            });
        });
    });
}