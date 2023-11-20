import express from 'express'
import companiesRouter from './routes/company'
import employeesRouter from './routes/employee'
import authenticationRouter from './routes/authentication'

require('dotenv').config();
const authenticationMiddleware = require('./middleware/authentication.middleware');
const app = express()
app.use(express.json()) //middleware

const PORT = 3000

// Companies
app.use('/api/companies', authenticationMiddleware ,companiesRouter)
// Employees
app.use('/api/employees', authenticationMiddleware, employeesRouter)
// Authentication
app.use('/api/authentication', authenticationRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
