import { Router } from "express";
import { getListUser, addUser, updateUser, deleteUser } from "../controllers/UserControllers.js";

const userRoutes = Router();

// GET 
userRoutes.get("/list-user", getListUser);
// POST 
userRoutes.post("/add-user", addUser);
// PUT 
userRoutes.put("/update-user/:id", updateUser);
// DELETE
userRoutes.delete("/delete-user/:id", deleteUser);

export default userRoutes;