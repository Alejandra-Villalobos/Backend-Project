const Express = require("express");
const { getDBHandler } = require("../db");

const RequestHandler = Express.Router();

RequestHandler.get("/to-dos", async (req, res, next) => {
    try {
        const dbHandler = await getDBHandler();
        const todos = await dbHandler.all("SELECT * FROM todos");
        await dbHandler.close();
        if(!todos || !todos.length){
            return res.status(404).send({ message: "To Dos Not Found" }).end();
        }
        res.send({ todos })
    } catch (error) {
        res.status(500).send({
            error: `Error while trying to get the to dos list:`,
            errorInfo: error.message,
        });
    }
});

RequestHandler.post("/to-dos", async (req, res, next) => {
    try {
        const date = new Date();
        const creationDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const editionNullDate = '';
        const { title, description, isDone: is_done, priority } = req.body;
        const dbHandler = await getDBHandler();
        const newTodo = await dbHandler.run(`
            INSERT INTO todos (title, description, is_done, creation_date, edition_date, priority)
            VALUES (
                '${title}',
                '${description}',
                ${is_done},
                '${creationDate}',
                '${editionNullDate}',
                ${priority}
            )
        `);
        await dbHandler.close();
        res.send({ newTodo })
    } catch (error) {
        res.status(500).send({
            error: `Error while trying to create a to do:`,
            errorInfo: error.message,
        });
    }
});

RequestHandler.patch("/to-dos/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const date = new Date();
        const editionDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        const { title, description, isDone: is_done, priority } = req.body;
        const dbHandler = await getDBHandler();
        const todoToUpdate = await dbHandler.get(
            "SELECT * FROM todos WHERE id = ?",
            todoId
        );
        await dbHandler.run(`
            UPDATE todos 
            SET title = ?, description = ?, is_done = ?, edition_date = ?, priority = ?
            WHERE id = ?`, 
            title || todoToUpdate.title,
            description || todoToUpdate.description,
            is_done !== undefined ? is_done : todoToUpdate.is_done,
            editionDate,
            priority,
            todoId
        );
        
        const updatedTodo = await dbHandler.get(
            "SELECT * FROM todos WHERE id = ?",
            todoId
          );
      
          await dbHandler.close();
      
          res.send({ updatedTodo });
    } catch (error) {
        res.status(500).send({
            error: `Error while trying to update a to do:`,
            errorInfo: error.message,
        });
    }
});

RequestHandler.delete("/to-dos/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const dbHandler = await getDBHandler();
        const deletedTodo = await dbHandler.run(
            "DELETE FROM todos WHERE id = ?",
            todoId
        );
        await dbHandler.close();
        res.send({ todoRemoved: { ...deletedTodo } });
    } catch (error) {
        res.status(500).send({
            error: `Error while trying to delete a to do:`,
            errorInfo: error.message,
        });
    }
});

module.exports = RequestHandler;