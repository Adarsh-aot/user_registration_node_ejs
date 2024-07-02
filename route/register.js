const data = [
    {
        name : "admin",
        password : "admin" , 
        phno : "1234567890",
        username : "admin"
    }
]

const getdata = (req, res) => {
    if(req.session.user){
        res.redirect("/")
    }
    else{
        const error = req.session.error || ""
        req.session.error = null
        res.render('login' , {error : error});
    }
}


const register = (req, res) => {
    const error = req.session.add || ""
    req.session.add = null
    res.render('register' , {error : error});
}

const edit = (req, res) => {
    console.log(req.session.user);
    if(req.session.user){
        
        res.render('edit' , {user : req.session.user});
    }else{
        
        res.redirect("/login")
    }
}



const edit_data  = (req, res) => {
    console.log("data" , req.body);
    const username = req.session.user.username
    console.log(username);
    const i = data.findIndex(x => x.username == username);
    console.log(i);
    if(i == -1){
        req.session.add = "user not found"
        // res.render('edit' , { error : req.session.add })
    }
    else{
        req.body.username = req.session.user.username
        data[i] = req.body
        req.session.user = req.body;
        res.redirect('/');
    }
}

const home = (req, res) => {
    console.log(req.session.user);
    if(req.session.user){
        
        res.render('home' , {user : req.session.user});
    }else{
        
        res.redirect("/login")
    }
}

const login_data = (req, res) => {
    console.log("data" , req.body);
    const username = req.body.username;
    const password = req.body.password;
    const i = data.findIndex(x => x.username == username && x.password == password);
    console.log(i);
    if(i == -1){
        req.session.error = "user not found"
        res.render('login' , {error : req.session.error });
    }
    else{
        
        req.session.user = data[i];
        res.redirect("/")
    }
}

const register_data = (req, res) => {
    console.log("data" , req.body);
    const username = req.body.username;
    const i = data.findIndex(x => x.username == username);
    console.log(i);
    if(i == -1){
        data.push(req.body)
        req.session.user = req.body;
        res.redirect("/")
    }
    else{
        req.session.add = "user already exists"
        res.render('register' , { error : req.session.add })
    }
}



const delete_data = (req, res) => {
    const username = req.params.username
    const i = data.findIndex(x => x.username == username);
    if(i == -1){
        req.session.add = "user not found"
        res.render('edit' , { error : req.session.add })
    }
    else{
        data.splice(i,1)
        req.session.user = null;
        res.redirect("/")
    }
}
const logout = (req, res) => {
    
    req.session.user = null;
    res.redirect("/login")
}



module.exports = {
    getdata ,
    login_data , 
    home ,
    logout  ,
    register_data ,
    register ,
    edit ,
    edit_data , 
    delete_data
}