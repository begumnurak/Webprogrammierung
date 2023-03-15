module.exports = function(app, db) {

    const comments = {};

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

    app.post('/add_recipe', (req, res) => {
        var sql = "INSERT INTO recipes (rec_title, rec_ingredients, rec_needed_time, rec_instructions, rec_image_link, rec_cat_id) VALUES (?,?,?,?,?,?)";
        if (req.body.title && req.body.needed_time && req.body.instructions && req.body.ingredients && req.body.category && req.body.image) {
            var params = [req.body.title, req.body.ingredients, req.body.needed_time, req.body.instructions, req.body.image, req.body.category];
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
        var sql = "INSERT INTO recipes (rec_title, rec_ingredients, rec_needed_time, rec_instructions, rec_image_link, rec_cat_id) VALUES (?,?,?,?,?,?)";
        if (req.body.json && req.body.category) {
            let json = JSON.parse(req.body.json);
            var params = [json.title, json.ingredients, json.needed_time, json.instructions, json.image, req.body.category];
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


    app.post('/add_recipe_comment', (req, res) => {
        if (req.body.comment && req.body.recipe) {

            if(!comments[req.body.recipe]) comments[req.body.recipe] = [];

            const author = "Unbekannt";
            var sql = "SELECT use_name FROM user WHERE use_session_cookie = ?";
            var params = [req.cookies.user];
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                comments[req.body.recipe].push({
                    author: rows[0].use_name,
                    content: req.body.comment,
                });
                res.status(302).header("location", req.headers["referer"]).json({});
            });
        } else {
            res.status(400).json({ "error": "empty parameters" });
        }
    });

    app.get('/recipe/:recipe', (req, res) => {
        var sql = "SELECT * FROM recipes WHERE rec_title = ?";
        var params = [req.params.recipe];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            if (rows.length < 1) {
                res.status(400).send(`Es wurde kein Rezepte namens "${req.params.recipe}" gefunden.`);
                return;
            }
            res.render('pages/recipe', {
                recipe: rows[0],
                comments: comments[rows[0].rec_id] ? comments[rows[0].rec_id] : []
            });
        });
    });
}