import { Router } from "express";
import { getListService, addService, updateService, deleteService } from "../controllers/ServiceControllers.js";
const serviceRoutes = Router();

// GET 
serviceRoutes.get("/list-service", getListService);
// POST 
serviceRoutes.post("/add-service", addService);
// PUT 
serviceRoutes.put("/update-service/:id", updateService);
// DELETE 
serviceRoutes.delete("/delete-service/:id", deleteService);

export default serviceRoutes;