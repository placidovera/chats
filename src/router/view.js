import { Router } from "express";


const route = Router();

route.get("/perfil",(req,res)=>{
  res.render("index",{
    name:"martin"
  })  
})
route.get("/socket", (req, res) => {
  res.render("chat",{});
});
route.get("/form",(req,res)=>{
  res.render("form",{});
})

export default route;