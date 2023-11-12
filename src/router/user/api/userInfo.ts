import db from "../../../database";
import { ISetRouter } from "../../type";

const info: ISetRouter = async (req, res) => {
  let userData = (req.session as any).userData;
  return res.send({
    code: 200,
    data: userData,
    message: "获取用户信息成功!",
  });
};
const routerList: ISetRouter = async (req, res) => {
  let sql: string = "select * from router where type = ?";
  let rs = await db.query(sql, ["teacher"]);
  return res.send({
    code: 200,
    data: rs,
    message: "获取教师路由信息成功!",
  });
};

export default { info, routerList };
