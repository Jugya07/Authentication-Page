const express = require("express");
const bodyParser = require("body-parser");
const bcrypt =  require("bcrypt");
const app = express();
const saltRounds = 10;
const Profile = require("./models/profiles");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

let user = 0;

app.get('/',(req, res)=>{
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login");
  });
  
app.get("/register", (req, res)=>{
    res.render("register" ,{user:user});
  });

app.post("/register",(req,res)=>{
    Profile.find({email:req.body.email},(err,found)=>{
        if(err){
            console.log(err);
        }else{
            if(found.length == 0){
                bcrypt.hash(req.body.password , saltRounds ,(err , hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        const profile = new Profile({
                            username:req.body.username,
                            email:req.body.email,
                            password:hash
                        });
                        profile.save();
                        res.render("main");
                    }
                })
               
            }else{
                let user = 1;
                res.render("register" , {user : user});
            }
        }
})
})

app.get("/logout", (req, res)=>{
      res.redirect('/');
  });
  
app.post("/login",(req,res)=>{
    Profile.find({email:req.body.email},(err,found)=>{
        if(err){
            console.log(err);
        }else{
            if(found.length == 0){
                res.render("login");
            }else{
                bcrypt.compare(req.body.password, found[0].password, function(err, result) {
                    if(result == true){
                        res.render("main");
                    }else{
                        res.render("login");
                    }
                });
            }
        }
    })
});

module.exports = app;