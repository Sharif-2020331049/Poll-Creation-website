

import express, { urlencoded } from 'express'
import cors from 'cors'
import pollRoute from './routers/poll.route.js';

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// import routes
app.use('/api/v1/poll', pollRoute)


export { app }
