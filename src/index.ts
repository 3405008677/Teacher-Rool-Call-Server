// 加载环境变量 process.env
// 默认读取项目根目录下的.env文件
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { join } from "path";
// 导入数据库接口
import db from "./database";
// 实例化express对象
const app = express();
app.use(express.json()); // 解析body,不然服务器解析不了json数据post的data数据接收不到
app.use(express.urlencoded({ extended: true })); // 解析form表单的数据
app.use(express.static(join(__dirname, "public")));
// 配置会话
import session from "./verification/session";
app.use(session.setSession());
// 定义一个路由处理函数,处理根路由
import routerCreate from "./router";
routerCreate(app);
// 监听端口,开始HTTP服务
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
// 结束进程
process.on("SIGINT", async () => {
  // 关闭数据库链接
  await db.close();
  // process.exit() 方法指示 Node.js 以 code 的退出状态同步终止进程。
  process.exit();
});
