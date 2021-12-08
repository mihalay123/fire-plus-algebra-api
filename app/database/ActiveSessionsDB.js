import db from './db.js'

class ActiveSessionsDB {
	async createSession(id, token) {
		const client = await db.connect()
		try {
			const client = await db.connect()
			await client.query(`INSERT INTO active_sessions (id, token)
                            VALUES (${id}, '${token}')`)
		} catch (error) {
			throw { statusCode: 400, message: 'Session already exists' }
		} finally {
			client.release()
		}
	}
	async deleteSession(token) {
		const client = await db.connect()
		try {
			const resultObj = await client.query(`DELETE FROM active_sessions
                            WHERE token = '${token}'`)
			if (resultObj.rowCount === 0) {
				throw { statusCode: 500, message: 'Session not found' }
			}
		} catch (error) {
			throw {
				statusCode: error.statusCode || 400,
				message: error.message,
			}
		} finally {
			client.release()
		}
	}
}

export default new ActiveSessionsDB()
