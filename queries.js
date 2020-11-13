const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getStudents = (req, res) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createStudent = (req, res) => {
    const {name, grades} = req.body
    pool.query('INSERT INTO students (name, grades) VALUES ($1, $2)', [name, grades], (error, results) => {
        if(error) {
            throw error
        }
        res.status(201).send(`Student added with ID: ${result.insertId}`)
    })
}
