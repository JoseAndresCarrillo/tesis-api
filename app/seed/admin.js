const Admin = require('../models/staff/Admin')

async function createAdmin () {
  const employees = await Admin.create([
    { name: 'Administrador', auth: { email: 'admin@cuyes.com', password: 'ADMIN2018-CUYES' } }
  ])
  return employees.map(a => a._id)
}

module.exports = { createAdmin }
