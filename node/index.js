const app = require('express')()
const mysql = require('mysql2/promise')

const port = 3000

app.get('/', async (req, res) => {
    const result = await executeQuery()
    const namesList = result.reduce((previous, current) => {
        return previous + `<li>${current.name}</li>`
    }, '')
    res.send(`<h1>Full Cycle!!</h1><h3>Nomes cadastrados:</h3><ul>${namesList}</ul>`)
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

const executeQuery = async () => {
    const connection = await mysql.createConnection('mysql://root:root@db:3306/nodedb')
    await connection.connect()
    const [result] = await connection.query('select * from people')
    await connection.end()
    return result
}