module.exports = function(app, db) {

    app.get('/', (req, res) => {
        var sql = "SELECT * FROM categories ORDER BY cat_name";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.render('pages/landing_page', {
                categories: rows
            });
        });
    });
}