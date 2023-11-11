import { Request, Response } from "express";
export interface ISetRouter {
  (req: Request, res: Response): void;
}
