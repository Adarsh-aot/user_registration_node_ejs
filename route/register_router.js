const express = require('express');
const register_function = require('./register');
const route = express.Router();



route.get('/',register_function.home);  
route.get('/login',register_function.getdata);
route.post('/login',register_function.login_data);
route.get('/logout',register_function.logout);
route.post('/register',register_function.register_data);
route.get('/register',register_function.register);
route.get('/edit',register_function.edit);
route.post('/edit',register_function.edit_data);
route.get('/delete/:username',register_function.delete_data);


module.exports = route;