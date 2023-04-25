import express from "express";
import { userFilters } from "./userFilters";

const userRouter = express.Router();
type keyType = keyof typeof userFilters;
const keys = Object.keys(userFilters) as keyType[];

keys.forEach((key) => {
  userRouter.get(`/${key}`, async (_req, res) => {
    const data = await userFilters[key]();
    res.send(data);
  });
});


export default userRouter;
