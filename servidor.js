const express = require('express')
const contenedor = require('./contenedor')

const app = express()
const PORT = 8080


let container = new contenedor('./productos.txt')

let random = () =>{
    var num = Math.random() * (3);
    return Math.floor(num) 
  }
    


app.get('/',(req, res)=>{
    res.send('<h1>Reto 3</h1>')
})

app.get('/productos',async (req, res)=>{
    let productos = await container.getAll()
    res.send(productos)
})

app.get('/productoRandom',async (req, res)=>{
    let productos = await container.getAll()
    res.json(productos[random(await productos.length)])
})



app.listen(PORT || 4000, ()=>{
    console.log(`el servidor está corriendo en el puerto ${PORT}`)
})
