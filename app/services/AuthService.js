import UsersDB from '../database/UsersDB.js'
import ActiveSessionsDB from '../database/ActiveSessionsDB.js'
const { createHmac } = await import('crypto')

class AuthService {
	async login(email, password) {
		try {
			const user = await UsersDB.getByEmailAndPassword(email, password)
			if (!user) {
				throw { statusCode: 500, message: 'User not found' }
			}
			if (email != user.email) {
				throw { statusCode: 400, message: 'email is not valid' }
			}
			if (password != user.password) {
				throw { statusCode: 400, message: 'password is not valid' }
			}
			const token = createHmac('sha256', String(user.id))
											.update('firePlusAlgebra')
											.digest('hex')
		
			await ActiveSessionsDB.createSession(user.id, token)
			return { user, token }
		} catch (error) {
			throw error
		}	
	}
	async logout(token) {
		try {
			await ActiveSessionsDB.deleteSession(token)
		} catch (error) {
			throw error
		}
	}
	async signup(user) {
		try {
			await UsersDB.createUser(user)
		} catch (error) {
			throw error
		}
	}
}

export default new AuthService()
