
DROP DATABASE IF EXISTS pupeteer_db;
CREATE DATABASE pupeteer_db;
USE pupeteer_db;
CREATE TABLE websites(
	Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	Naam VARCHAR(50)
);
CREATE TABLE product(
	Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	Naam VARCHAR(50)
);
CREATE TABLE ProductOpWebsite(
	Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    URL VARCHAR(700),
	prijs DOUBLE UNSIGNED ,
    productId INT UNSIGNED,
    websiteId INT UNSIGNED,
    CONSTRAINT FK_ProductOpWebsite_Product FOREIGN KEY (productId) REFERENCES product(Id),
    CONSTRAINT FK_ProductOpWebsite_Website FOREIGN KEY (websiteId) REFERENCES websites(Id)
);
CREATE TABLE QuerySelectorValue(
	Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Value_Selector_Whole VARCHAR(20),
    Value_Selector_Sub VARCHAR(20),
	websiteId INT UNSIGNED,
    CONSTRAINT FK_QuerySelectorValue_Website FOREIGN KEY (websiteId) REFERENCES websites(Id)
);
CREATE TABLE ModuleWebsite(
	Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    PathModule VARCHAR(40),
    websiteId INT UNSIGNED,
    CONSTRAINT FK_ModuleWebsite_Website FOREIGN KEY (websiteId) REFERENCES websites(Id)
);
INSERT INTO websites (Naam) VALUES("amazon bel"),("bol.com");
INSERT INTO product (Naam) VALUES("nothing ear(a)"),("asus rog ally z1 extreme");
INSERT INTO ProductOpWebsite (URL, prijs, productId, websiteId) VALUES("https://www.amazon.nl/ASUS-Konsole-Display-Extreme-Windows/dp/B0C3W69P5S/ref=sr_1_1?crid=3IISWCAOX481G&dib=eyJ2IjoiMSJ9.HRaSW8bGaXQ3cmdEA5MWwrNor6yvWmn2pHLRGG4Qj0Jg4_EjpOKB8kZNAJYUKqcJsRLZZdsZEMhEcz6IlC81J1EZwpPk5sRIMYdMdcdwu51fP0kqeFjEygzBn5WcZAGYSlMkgPS_g2CyhQkk1N7_xOtrN1__Tj4GgJOyIxhMWaK_EkriCuIGOvFpOPusNYY6CzBoSMecNEXSXMvT8UAbOTay2fhxzTa3mMcBM5msL-7B4SVH1mj-iVTRrtUl0B8YgnJCJZsU6rWgqkIen_OQDxXGgjhGnNuYTHDsmJBxUZI.I4L7cT4av3FF6T9fb5sCwULyF3-IHsm5U2efHVE-z-w&dib_tag=se&keywords=asus%2Brog%2Bally%2Bz1%2Bextreme&qid=1731784209&sprefix=z1%2Bextr%2Caps%2C179&sr=8-1&th=1", 571.95,2,1),
("https://www.bol.com/be/nl/p/asus-rog-ally-ryzen-z1-extreme-gaming-console-handheld/9300000146818176/?bltgh=qKB7Jk0o97rTj5ZKGkRKyQ.2_18.21.ProductImage", 571.95, 2,2);
INSERT INTO QuerySelectorValue (Value_Selector_Whole,Value_Selector_Sub,websiteId) VALUES(".a-price-whole",".a-price-fraction",1);
SELECT URL, Prijs, product.Naam, websites.Naam FROM ProductOpWebsite LEFT JOIN product ON product.Id = ProductOpWebsite.productId LEFT JOIN websites ON websites.Id = ProductOpWebsite.websiteId;

INSERT INTO ModuleWebsite(PathModule, websiteId) VALUES ("amazon.js", 1);
SELECT * FROM ModuleWebsite;
