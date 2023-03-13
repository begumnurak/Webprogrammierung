-- sqlite

CREATE TABLE categories (
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
    rec_image text NOT NULL
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
);