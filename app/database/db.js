import PG from 'pg'
import database from './../../config/database.js'

const Pool = PG.Pool

const db = new Pool(database)

const databaseInit = async () => {
	await db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email varchar(256),
    password varchar(256),
    firstname varchar(256),
    lastname varchar(256),
    UNIQUE(email)
  )`)

	await db.query(`
  CREATE TABLE IF NOT EXISTS active_sessions (
    id INTEGER REFERENCES users UNIQUE,
    token varchar(256)
  )`)

	try {
		await db.query(`
    INSERT INTO users (email, password, firstname, lastname)
      VALUES ('user', 'user', 'Steve', 'Huis'),
              ('admin', 'admin', 'Cool', 'Boy')
  `)
	} catch (error) {}
}

databaseInit()

export default db
