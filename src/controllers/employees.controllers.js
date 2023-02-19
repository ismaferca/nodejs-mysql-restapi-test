import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
    //throw new Error('My error')
    try {
        throw new Error('My error')
        const [rows] = await pool.query('SELECT * FROM employees')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        })
    }
}

export const getEmployee = async (req, res) => {
    //res.send('Obteniendo empleado')
    //console.log('id empleado: ', req.params.id)

    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        })
    }

}

export const createEmployee = async (req, res) => {
    //para ver los datos que el cliente envía cuando hace la petición
    //console.log(req.body)
    const { name, salary } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?,?)', [name, salary])

        //se coloca entre llaves para que lo pueda devolver como un objeto json
        //res.send({rows})
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        })
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    //console.log(id, name, salary)

    try {
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

        if (result.affectedRows == 0) return res.status(404).json({
            message: 'Employee not found'
        })

        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id])

        res.json(rows[0])
        //console.log(result[0])
        //res.json('received')
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        })
    }
}


export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id])
        //console.log(result)
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        //indica que todo ha ido bien
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong'
        })
    }
}

