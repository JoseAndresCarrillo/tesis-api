const regex = {
    email: /^[a-z0-9]([a-z0-9-_.]*[a-z0-9_-])*@([a-z0-9]([a-z0-9-]*[a-z0-9])*\.)+[a-z0-9]{2,5}$/,
    phone: /^\d{9}$/,
    telephone: /^\d{7,9}$/,
    ruc: /^\d{11}$/,
    dni: /^\d{8}$/,
    slug: /^[\da-z-]+$/
  }
  
  module.exports = regex