import db from './db.js'

class UsersDB {
	async getByID(id) {
		try {
			const client = await db.connect()
			const user = await client.query(`SELECT * FROM users WHERE id = '${id}'`)
			client.release()
			return user.rows[0]
		} catch (error) {
			client.release()
			throw error
		}
	}
	async getByEmailAndPassword(email, password) {
		try {
			const client = await db.connect()
			const user = await client.query(
				`SELECT * FROM users 
					WHERE email = '${email}' AND password = '${password}'`
			)
			client.release()
			return user.rows[0]
		} catch (error) {
			client.release()
			throw error
		}
	}
	async createUser(user) {
		const client = await db.connect()
		try {
			await client.query(`INSERT INTO users (email, password, firstname, lastname)
														VALUES ('${user.email}', '${user.password}', '${user.firstname}', '${user.lastname}')`)
		} catch (error) {
			throw { statusCode: 400, message: 'email is already in use' }
		} finally {
			client.release()
		}
	}
}

export default new UsersDB()
