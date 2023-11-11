import express from "express";
import { isEmpty } from "lodash";
import db from "../../database";
import Token from "../../verification/token";
import loginApi from "./api/login";

const routerUser = express.Router();

routerUser.post("/login", loginApi.login).use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (isEmpty(token)) {
    return res.status(209).send({
      code: 400,
      data: null,
      message: "未登录!",
    });
  }
  let account = Token.verifyToken(token!);
  if (!account) {
    return res.send({
      code: 400,
      data: null,
      message: "Token过期,请重新登录!",
    });
  }
  let sql: string = "select * from admin where user = ?";
  let [rs] = await db.query(sql, [account]);
  console.log(rs);
  next();
});
export default routerUser;
