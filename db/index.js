const db = require("mongoose");

db.connect("mongodb+srv://123:12345@cluster0.naie754.mongodb.net/orders_db")
  .then(() => {
    console.log("Успешно подключено к MongoDB");
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err.message);
  });

module.exports = db;
