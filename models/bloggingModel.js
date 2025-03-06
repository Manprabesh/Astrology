import pool from "../database.js";

const createBloggingSchema = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS blogging(
        id SERIAL PRIMARY KEY,
        heading VARCHAR(30),
        content TEXT[],
    uploadedBy INT,
    CONSTRAINT fk_bloggingSchema FOREIGN KEY(uploadedBy) REFERENCES userAccount(id))`;
    console.log("table created");


    const res = await pool.query(createTableQuery);
    // console.log(res, "ressss");


}

export default createBloggingSchema
