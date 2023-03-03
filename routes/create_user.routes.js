module.exports = function(app, db) {

    app.post('/create_user', (req, res) => {
        let user_session_cookie = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
        var sql = "INSERT INTO user (use_name, use_session_cookie) VALUES (?, ?)";
        var params = [req.body.username, user_session_cookie];
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.cookie("user", user_session_cookie);
                res.redirect('/');
            });
    });
}