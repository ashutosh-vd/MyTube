import 'dotenv/config'
import connectDB from "./db/mongoose-connection.js";
import app from './app.js'

import debug from 'debug';
const log = debug('development: http')

connectDB().then(() => {
	app.listen(3000, (err) => {
		if (err) {
			console.log('error in server connection listen process')
		} else {
			log('server started')
		}
	})
}).catch(
	(err) => console.log('err during server connection:', err)
)

