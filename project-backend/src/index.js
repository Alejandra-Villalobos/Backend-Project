const Express = require("express");
const CorsMiddleware = require("cors")
const { initializeDB } = require("./lib/db/");
const RequestHandler = require("./lib/handlers/handlers");

const Api = Express();

Api.use(CorsMiddleware());
Api.use(Express.json());
Api.use(Express.urlencoded({ extended: false }));
Api.use("/api/v1", RequestHandler);

Api.listen(3000, ()=>{
    console.log("API RUNNING");

    initializeDB().then(() => {
        console.log("DATABASE READY");
    });
});

