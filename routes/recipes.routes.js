module.exports = function(app, db) {

    app.get('/test/:category', (req, res) => {
        var sql = "SELECT * FROM recipes, categories WHERE rec_category_id = cat_id AND cat_name = ? ORDER BY rec_title";
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
            res.render('pages/recipe_page', {
                category: req.params.category,
                recipes: rows
            });
        });
    });
}