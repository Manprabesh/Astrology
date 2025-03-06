import pool from "../database.js";

const createUserSchema=async ()=>{
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS userAccount(
        id SERIAL PRIMARY KEY,
       email VARCHAR(30),
      password VARCHAR(30)
    )`;

    await pool.query(createTableQuery)

}

// createUserSchema()

export default createUserSchema;