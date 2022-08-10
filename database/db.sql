CREATE DATABASE database_links;
USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--Links Table
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);


--Semillero Table
CREATE TABLE semillero(
    id INT(11) NOT NULL,
    title VARCHAR(255) NOT NULL,
    imageURL VARCHAR(255) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    user_id INT(11),
    fecha date NOT NULL,
    create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_semillero FOREIGN KEY (user_id) REFERENCES users (id)
);

ALTER TABLE semillero ADD PRIMARY KEY (id);
ALTER TABLE semillero MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



ALTER TABLE links ADD PRIMARY KEY (id);
ALTER TABLE links MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


INSERT INTO links (title,url,description) VALUES ('Spotify','https://open.spotify.com/','Esto es spotify');


INSERT INTO links (title,imageURL,public_id,description,fecha) VALUES ('semillerooo','imagen urlsdsd','public idsdsd','esto es una descripciosdsdn','2022-10-11');

