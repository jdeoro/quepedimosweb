import { createPool } from "mysql2/promise";

const poolcnx = createPool({
  host: "localhost",
  user: "root",
  password: "9521",
  port: "3306",
  database: "quepedimos",
});

export { poolcnx };
