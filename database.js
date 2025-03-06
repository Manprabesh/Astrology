import 'dotenv/config'
import pg from 'pg';
const { Pool } = pg;

const pass = process.env.databasePassword;
const user = process.env.databaseuser;


const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_tgbM0lE1houi@ep-raspy-paper-a4ya5upc-pooler.us-east-1.aws.neon.tech/practices?sslmode=require'
});

async function connect() {

  const er = await pool.connect()

}
connect()



export default pool