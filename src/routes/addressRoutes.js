import express from "express";
import AddressController from "../controllers/addressController.js";
const addressRouter = express.Router();
import { isAuth } from '../middleWare/authMiddleware.js';


addressRouter.post("/createaddress", isAuth, AddressController.createAddress);
addressRouter.get("/getalladdress", isAuth, AddressController.getAllAddresses);
addressRouter.delete("/deleteAddress/:id", isAuth, AddressController.deleteAddress);
addressRouter.put("/updateAddress/:id", isAuth, AddressController.updateAddress);
addressRouter.put("/isdefault/:id", isAuth, AddressController.defaultAddress);


export default addressRouter;
