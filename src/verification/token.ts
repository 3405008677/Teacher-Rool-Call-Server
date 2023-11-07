import jwt from "jsonwebtoken";

class Token {
  private PrivateKey: string;
  private Time: string;
  constructor(key?: string, time?: string) {
    key ? (this.PrivateKey = key) : (this.PrivateKey = process.env.TOKEN_PRIVATEKEY as string);
    time ? (this.Time = time) : (this.Time = process.env.TOKEN_TIME as string);
  }
  // 设置token
  setToken(payload: string) {
    let time = this.Time;
    let privatekey = this.PrivateKey;
    return jwt.sign({ payload }, privatekey, { expiresIn: time });
  }
  // 验证token
  verifyToken(token: string) {
    if (!token) return false;
    try {
      if (jwt.verify(token, this.PrivateKey)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

export default new Token();
