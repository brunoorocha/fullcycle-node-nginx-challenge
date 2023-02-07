const app = require('express')()
const mysql = require('mysql2/promise')

const port = 3000

app.get('/', async (_, res) => {
    await createTable()
    await executeNameIsertion('Bruno')
    const result = await executeQuery()
    const namesList = resultToHTMLList(result)
    res.send(`<h1>Full Cycle!!!</h1><h3>Nomes cadastrados:</h3><ul>${namesList}</ul>`)
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

const executeNameIsertion = async name => {
    const connection = await mysql.createConnection('mysql://root:root@db:3306/nodedb')
    await connection.connect()
    await connection.query('insert into people (name) values (?)', [name])
    await connection.end()
}

const resultToHTMLList = result => result.reduce((previous, current) => {
    return previous + `<li>${current.name}</li>`
}, '')

const createTable = async () => {
    const connection = await mysql.createConnection('mysql://root:root@db:3306/nodedb')
    await connection.connect()
    await connection.query('create table if not exists people (id int not null auto_increment, name varchar(255), primary key(id))')
    await connection.end()
}