const { initializeDB } = require("./lib/db/");

initializeDB().then(() => {
    console.log("DATABASE READY");
});