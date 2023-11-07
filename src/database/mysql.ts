import mysql from "mysql";

interface IPool {
  host?: string;
  user?: string;
  port?: number;
  password?: string;
  database?: string;
  connectionLimit: number;
}

class MySql {
  private POOL: mysql.Pool;
  constructor(config: IPool) {
    this.POOL = mysql.createPool(config); // 创建连接池
    this.connection();
  }
  private connection() {
    this.POOL.getConnection((err, connection) => {
      if (err) {
        console.log("连接服务器数据库失败!", err);
      }
    });
  }
  async query(sql: string, values: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      // 这里的values使用占位符 防止SQL注入
      this.POOL.query(sql, values, (err, result, fields) => {
        if (err) reject(err);
        // resolve([result, fields])
        resolve(result);
      });
    });
  }
  // 关闭连接池
  async close() {
    return new Promise((resolve, reject) => {
      this.POOL.end(err => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
// 导出
export { MySql, IPool };
