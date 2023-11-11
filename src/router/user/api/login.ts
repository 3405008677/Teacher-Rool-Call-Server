import db from "../../../database";
import { isEmpty } from "lodash";

import { ISetRouter } from "../../type";
import { userType } from "../type";
import Token from "../../../verification/token";

const login: ISetRouter = async (req, res) => {
  const { account, password }: userType = req.body;
  let sql: string = "select * from teacher where account = ?";
  let data = await db.query(sql, [account]);
  if (isEmpty(data)) {
    return res.send({
      code: 400,
      data: null,
      message: "用户不存在,请联系管理员!",
    });
  }
  sql = "select * from teacher where account = ? and password = ?";
  let [rs] = await db.query(sql, [account, password]);
  if (isEmpty(rs)) {
    return res.send({
      code: 400,
      data: null,
      message: "密码错误,请重新输入!",
    });
  }
  let token = Token.setToken(account);
  return res.send({
    code: 200,
    data: null,
    token,
    message: "登录成功!",
  });
};
export default { login };
