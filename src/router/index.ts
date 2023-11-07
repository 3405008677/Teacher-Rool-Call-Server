import express, { Express } from "express";
import path from "path";

const routerCreate = (app: Express) => {
  // 管理员路由
  // 用户路由
  app.use("/page", express.static(path.join(__dirname, "public")));
  // 设置404
  app.use("*", (req: express.Request, res: express.Response) => {
    res.status(404).send({
      data: null,
      meta: {
        message: "找不到对于录音",
        status: 404,
      },
      success: false,
    });
  });
};

export default routerCreate;
