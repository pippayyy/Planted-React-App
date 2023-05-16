import mysql from "mysql2/promise";

export const connection = await mysql
  .createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "aloeVera123!",
    database: "pip_test",
    port: "3306",
  })
  .then((conn) => {
    console.log("Connected to the MySQL server!");
    return conn;
  })
  .catch((err) => {
    console.error("error: " + err.message);
  });
