import session from "express-session";

class Session {
  private PrivateKey: string;
  private Time: number;
  constructor(key?: string, time?: number) {
    key ? (this.PrivateKey = key) : (this.PrivateKey = process.env.SESSION_PRIVATEKEY!);
    time ? (this.Time = time) : (this.Time = parseInt(process.env.SESSION_TIME!));
  }
  setSession() {
    return session({
      secret: this.PrivateKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: this.Time,
      },
    });
  }
}

export default new Session();
