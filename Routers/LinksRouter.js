import express from 'express'
import LinksController from '../controllers/LinksController.js'

const LinksRouter = express.Router()

LinksRouter.get("/", LinksController.getList);
LinksRouter.get("/:id", LinksController.getById);
LinksRouter.post("/", LinksController.add);
LinksRouter.put("/:id", LinksController.update);
LinksRouter.delete("/:id", LinksController.delete);
LinksRouter.get("/target/:id", LinksController.getByTarget);

export default LinksRouter