import { MySql, IPool } from "./mysql";

const config: IPool = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  port: parseInt(process.env.SQL_PORT!),
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  connectionLimit: parseInt(process.env.SQL_CONNECTIONLIMIT!),
};
// 实例化database对象
export default new MySql(config);
