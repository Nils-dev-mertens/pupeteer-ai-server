import { error } from "console";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

const db = new sqlite.Database("database.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

export function SetupDb() {
  db.serialize(() => {
    db.run(`
      DROP TABLE IF EXISTS websites;
    `);
    db.run(`
      DROP TABLE IF EXISTS product;
    `);
    db.run(`
      DROP TABLE IF EXISTS ProductOpWebsite;
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS websites (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Naam VARCHAR(50)
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS product (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Naam VARCHAR(50)
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS ProductOpWebsite (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        URL VARCHAR(700),
        prijs DOUBLE,
        productId INTEGER,
        websiteId INTEGER,
        FOREIGN KEY (productId) REFERENCES product(Id),
        FOREIGN KEY (websiteId) REFERENCES websites(Id)
      );
    `);
    
    db.run(`
      CREATE TABLE ModuleWebsite(
	      Id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        Path VARCHAR(40),
        websiteId INT UNSIGNED,
        CONSTRAINT FK_ModuleWebsite_Website FOREIGN KEY (websiteId) REFERENCES websites(Id)
      );
    `);
    console.log("Database setup completed successfully.");
  });
}
export function InsertTestData() {
    db.serialize(() => {
      db.run(`INSERT INTO websites (Naam) VALUES("amazon bel"),("bol.com");`);
      db.run(`INSERT INTO product (Naam) VALUES("nothing ear(a)"),("asus rog ally z1 extreme");`);
      db.run(`INSERT INTO ProductOpWebsite (URL, prijs, productId, websiteId) VALUES("https://www.amazon.nl/ASUS-Konsole-Display-Extreme-Windows/dp/B0C3W69P5S/ref=sr_1_1?crid=3IISWCAOX481G&dib=eyJ2IjoiMSJ9.HRaSW8bGaXQ3cmdEA5MWwrNor6yvWmn2pHLRGG4Qj0Jg4_EjpOKB8kZNAJYUKqcJsRLZZdsZEMhEcz6IlC81J1EZwpPk5sRIMYdMdcdwu51fP0kqeFjEygzBn5WcZAGYSlMkgPS_g2CyhQkk1N7_xOtrN1__Tj4GgJOyIxhMWaK_EkriCuIGOvFpOPusNYY6CzBoSMecNEXSXMvT8UAbOTay2fhxzTa3mMcBM5msL-7B4SVH1mj-iVTRrtUl0B8YgnJCJZsU6rWgqkIen_OQDxXGgjhGnNuYTHDsmJBxUZI.I4L7cT4av3FF6T9fb5sCwULyF3-IHsm5U2efHVE-z-w&dib_tag=se&keywords=asus%2Brog%2Bally%2Bz1%2Bextreme&qid=1731784209&sprefix=z1%2Bextr%2Caps%2C179&sr=8-1&th=1", 571.95,2,1),
("https://www.bol.com/be/nl/p/asus-rog-ally-ryzen-z1-extreme-gaming-console-handheld/9300000146818176/?bltgh=qKB7Jk0o97rTj5ZKGkRKyQ.2_18.21.ProductImage", 571.95, 2,2);`, (err) => {
        if (err) {
          console.error("Error inserting test data:", err.message);
        } else {
          console.log("Test data inserted into ProductOpWebsite.");
        }
      });
    });
  } 
  export function Insertproduct(Naam) {
    db.run(`INSERT INTO product (Naam) VALUES("${Naam}")`);
  }
  export function Insertwebsite(Naam){
    db.run(`INSERT INTO websites (Naam) VALUES("${Naam}")`);
  } 
  export function Insertproductopwebsite(params) {
    
  }
  export function LogResults() {
    return new Promise((resolve, reject) => {
      db.all("SELECT URL, Prijs, product.Naam AS 'ProductName', websites.Naam AS 'WebsiteName' FROM ProductOpWebsite LEFT JOIN product ON product.Id = ProductOpWebsite.productId LEFT JOIN websites ON websites.Id = ProductOpWebsite.websiteId;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function ReturnProduct() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM product;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function ReturnWebsite() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM websites;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
// SetupDb();
// InsertTestData();
setTimeout(() => {
  LogResults();
}, 1000);