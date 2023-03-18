module.exports = function(app, db, visits) {

    app.get('/', (req, res) => {
        var sql = "SELECT * FROM categories ORDER BY cat_name";
        var params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
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

                res.render('pages/landing_page', {
                    categories: rows,
                    mostViewed: rows_n
                });
            });
        });
    });
    app.get('/index.html', (req, res) => {
        res.status(302).location("/");
    });

}