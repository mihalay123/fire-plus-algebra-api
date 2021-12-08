import express from 'express'
import authRouter from './app/routers/authRouter.js'

import server from './config/server.js'

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

async function startApp() {
	try {
		app.listen(server.PORT, () =>
			console.log('SERVER STARTED ON PORT ' + server.PORT)
		)

		app.get('/', (req, res) => {
			res.json('hello')
		})

		app.post('/', (req, res) => {
			console.log(req.body)
			res.status(200).json('works')
		})
	} catch (error) {
		console.log(error)
	}
}

startApp()
