import SessionData from "express-session";
declare module "express-session" {
  interface SessionData {
    userData: {
      uid: number;
      account: string;
      password: string;
      name: string;
    };
  }
}
