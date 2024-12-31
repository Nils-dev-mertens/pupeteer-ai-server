import { error } from "console";
import { promises } from "dns";
import { resolve } from "path";
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
      DROP TABLE IF EXISTS ModuleWebsite;
    `);
    db.run(`
      DROP TABLE IF EXISTS Record;
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
        productId INTEGER,
        websiteId INTEGER,
        FOREIGN KEY (productId) REFERENCES product(Id),
        FOREIGN KEY (websiteId) REFERENCES websites(Id)
      );
    `);
    
    db.run(`
      CREATE TABLE IF NOT EXISTS ModuleWebsite (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Path VARCHAR(40),
        websiteId INTEGER,
        FOREIGN KEY (websiteId) REFERENCES websites(Id)
      );
    `);
    
    db.run(`
      CREATE TABLE IF NOT EXISTS Record (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        prijs DOUBLE,
        DateRecord DATE,
        ProductOpWebsiteId INTEGER,
        FOREIGN KEY (ProductOpWebsiteId) REFERENCES ProductOpWebsite(Id)
      );
    `);
    console.log("Database setup completed successfully.");
  });
}
export function InsertTestData() {
    db.serialize(() => {
      db.run(`INSERT INTO websites (Naam) VALUES("amazon bel"),("bol.com");`);
      db.run(`INSERT INTO product (Naam) VALUES("nothing ear(a)"),("asus rog ally z1 extreme");`);
      db.run(`INSERT INTO ProductOpWebsite (URL, productId, websiteId) VALUES("https://www.amazon.nl/ASUS-Konsole-Display-Extreme-Windows/dp/B0C3W69P5S/ref=sr_1_1?crid=3IISWCAOX481G&dib=eyJ2IjoiMSJ9.HRaSW8bGaXQ3cmdEA5MWwrNor6yvWmn2pHLRGG4Qj0Jg4_EjpOKB8kZNAJYUKqcJsRLZZdsZEMhEcz6IlC81J1EZwpPk5sRIMYdMdcdwu51fP0kqeFjEygzBn5WcZAGYSlMkgPS_g2CyhQkk1N7_xOtrN1__Tj4GgJOyIxhMWaK_EkriCuIGOvFpOPusNYY6CzBoSMecNEXSXMvT8UAbOTay2fhxzTa3mMcBM5msL-7B4SVH1mj-iVTRrtUl0B8YgnJCJZsU6rWgqkIen_OQDxXGgjhGnNuYTHDsmJBxUZI.I4L7cT4av3FF6T9fb5sCwULyF3-IHsm5U2efHVE-z-w&dib_tag=se&keywords=asus%2Brog%2Bally%2Bz1%2Bextreme&qid=1731784209&sprefix=z1%2Bextr%2Caps%2C179&sr=8-1&th=1", 2,1),
("https://www.bol.com/be/nl/p/asus-rog-ally-ryzen-z1-extreme-gaming-console-handheld/9300000146818176/?bltgh=qKB7Jk0o97rTj5ZKGkRKyQ.2_18.21.ProductImage", 2,2);`, (err) => {
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
  export function Insertproductopwebsite(IdProduct, IdWebsite, Url) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ProductOpWebsite(productId, websiteId, URL) VALUES(?, ?, ?)`;
      db.run(query, [IdProduct, IdWebsite, Url], function (err) {
          if (err) {
              console.error("Error inserting ProductOpWebsite:", err);
              reject(err);
          } else {
              console.log("ProductOpWebsite inserted successfully");
              resolve("succes");
          }
      });
    });
  }
  export function ReturnProductOpWebsite() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM ProductOpWebsite;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function LogResults() {
    return new Promise((resolve, reject) => {
      db.all("SELECT ProductOpWebsite.Id, URL, product.Naam AS 'ProductName', websites.Naam AS 'WebsiteName' FROM ProductOpWebsite LEFT JOIN product ON product.Id = ProductOpWebsite.productId LEFT JOIN websites ON websites.Id = ProductOpWebsite.websiteId;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function ReturnRecordById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Record WHERE Id = ${id};`, (err, rows) => {
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
  export function Returnrecords(){
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM record;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function ReturnrecordsFull(){
    return new Promise((resolve, reject) => {
      db.all("SELECT Prijs, Daterecord, Url FROM record LEFT JOIN ProductOpWebsite ON record.ProductOpWebsiteId = ProductOpWebsite.Id;", (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  export function InsertNewRecord(IdProductOnWebsite, prijs) {
    const date_time = new Date();
    const formattedDate = returndateformat(date_time);
    const query = `INSERT INTO Record(prijs, ProductOpWebsiteId, DateRecord) VALUES(?, ?, ?)`;
    db.run(query, [prijs, IdProductOnWebsite, formattedDate], function (err) {
        if (err) {
            console.error("Error inserting record:", err);
        } else {
            console.log("Record inserted successfully");
        }
    });
}
export function DeleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `DELETE FROM Record WHERE ProductOpWebsiteId = (SELECT id FROM ProductOpWebsite WHERE productId = ${id})`,
        (err) => {
          if (err) {
            console.error(`Error inserting product: ${err}`);
            reject(err);
          } else {
            console.log('records deleted successfully');
            resolve();
          }
        }
      );
      db.run(
        `DELETE FROM ProductOpWebsite WHERE productId = ${id}`,
        (err) => {
          if (err) {
            console.error(`Error inserting product: ${err}`);
            reject(err);
          } else {
            console.log('productopwebsite deleted successfully');
            resolve();
          }
        }
      );
      db.run(
        `DELETE FROM product WHERE Id = ${id}`,
        (err) => {
          if (err) {
            console.error(`Error inserting product: ${err}`);
            reject(err);
          } else {
            console.log('product deleted successfully');
            resolve();
          }
        }
      );
    });
  });
}

export function DeleteWebsite(id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `DELETE FROM Record WHERE ProductOpWebsiteId = (SELECT id FROM ProductOpWebsite WHERE websiteId = ${id})`,
        (err) => {
          if (err) {
            console.error(`Error deleting records: ${err}`);
            reject(err);
          } else {
            console.log('records deleted successfully');
            resolve();
          }
        }
      );
      db.run(
        `DELETE FROM ProductOpWebsite WHERE websiteId = ${id}`,
        (err) => {
          if (err) {
            console.error(`Error deleting product-op-website: ${err}`);
            reject(err);
          } else {
            console.log('product-op-website deleted successfully');
            resolve();
          }
        }
      );
      db.run(
        `DELETE FROM websites WHERE Id = ${id}`,
        (err) => {
          if (err) {
            console.error(`Error deleting website: ${err}`);
            reject(err);
          } else {
            console.log('website deleted successfully');
            resolve();
          }
        }
      );
    });
  });
}

function returndateformat(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export function ResertDatabase() {
return new Promise((resolve, reject) => {
  db.serialize(() => {
    db.run("DELETE FROM websites;", (err) => {
      if (err) {
        console.error(`Error deleting websites: ${err}`);
        reject(err);
      } else {
        console.log('websites deleted successfully');
        resolve();
      }
    });
    db.run("DELETE FROM product;", (err) => {
      if (err) {
        console.error(`Error deleting products: ${err}`);
        reject(err);
      } else {
        console.log('products deleted successfully');
        resolve();
      }
    });
    db.run("DELETE FROM ProductOpWebsite;", (err) => {
      if (err) {
        console.error(`Error deleting ProductOpWebsites: ${err}`);
        reject(err);
      } else {
        console.log('ProductOpWebsites deleted successfully');
        resolve();
      }
    });
    db.run("DELETE FROM ModuleWebsite;", (err) => {
      if (err) {
        console.error(`Error deleting ModuleWebsites: ${err}`);
        reject(err);
      } else {
        console.log('ModuleWebsite deleted successfully');
        resolve();
      }
    });
    db.run("DELETE FROM Record;", (err) => {
      if (err) {
        console.error(`Error deleting Records: ${err}`);
        reject(err);
      } else {
        console.log('Records deleted successfully');
        resolve();
      }
    });
  });
});
}
// SetupDb();
// setTimeout(() => {
//   InsertTestData();
// }, 1000);