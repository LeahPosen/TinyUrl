import express from 'express'

import UsersController from '../controllers/UsersController.js';
const UsersRouter = express.Router()
// UsersRouter.get('/', UsersController.getUsets)
// UsersRouter.post('/', UsersController.postUser)
// UsersRouter.put('/:id', UsersController.putUser)
// UsersRouter.delete('/:id', UsersController.deleteUser)

UsersRouter.get("/", UsersController.getList);
UsersRouter.get("/:id", UsersController.getById);
UsersRouter.post("/", UsersController.add);
UsersRouter.put("/:id", UsersController.update);
UsersRouter.delete("/:id", UsersController.delete);

export default UsersRouter