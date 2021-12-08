import AuthService from '../services/AuthService.js'

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body
			const token = await AuthService.login(email, password)
			res.status(200).json(token)
		} catch (error) {
			res.status(error.statusCode || 400).json(error.message)
		}
	}
	async logout(req, res) {
		try {
			const { token } = req.body
			await AuthService.logout(token)
			res.status(200).json('OK')
		} catch (error) {
			res.status(error.statusCode || 400).json(error.message)
		}
	}
	async signup(req, res) {
		try {
			const { email, password, firstname, lastname } = req.body
			await AuthService.signup({ email, password, firstname, lastname })
			res.status(200).json('OK')
		} catch (error) {
			res.status(error.statusCode || 400).json(error.message)
		}
	}
}

export default new AuthController()
