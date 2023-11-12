import express from "express";
import { isEmpty } from "lodash";
import db from "../../database";
import Token from "../../verification/token";

import loginApi from "./api/login";
import userInfo from "./api/userInfo";

const routerUser = express.Router();

routerUser
  .post("/login", loginApi.login)
  .use(async (req, res, next) => {
    const token = (req.headers.authorization as string).split(" ")[1];
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
    let sql: string = "select * from teacher where account = ?";
    let [rs] = await db.query(sql, [account]);
    (req.session as any).userData = rs;
    next();
  })
  .get("/info", userInfo.info)
  .get("/routerList", userInfo.routerList);
export default routerUser;
