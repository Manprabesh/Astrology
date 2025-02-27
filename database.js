import 'dotenv/config'
import pg from 'pg';
const { Pool } = pg;

const pass=process.env.databasePassword;
const user=process.env.databaseuser;


const pool = new Pool({
  user: user,
      password:pass,
      host: 'localhost',
      port: 5432,
      // default Postgres port
      database: 'astrologyBlogs'
});


pool.connect((err, client, done) => {
  if (err) {
      console.error('Error connecting to the database:', err);
  } else {
      console.log('Successfully connected to database');
  }
});


export default pool