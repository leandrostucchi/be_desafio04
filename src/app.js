import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/products.router.js"
import { Server } from "socket.io";
import productManager from "./public/js/products.js"
const port = 8080

const app = express();

const httpServer =  app.listen(port,() => console.log('Servidor arriba  puerto:' + port))

const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/ping',(req,res) =>{     res.send('pong') })


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter)

//ROUTES
app.use("/api/products", productsRouter);

io.on('connection', socketServer => {
  console.log('Nuevo cliente conectado')

  socketServer.on("addProduct", async (data) => {
    console.log(data)
    //await productManager.addProduct(tittle,description,price,thumbnail,code,stock);
    await productManager.addProduct('',data.name,data.price,'','',0);
    io.emit("recibirProductos", productManager.getProducts());
  });

  socketServer.on("deleteProduct", async (productId) => {
    console.log("deleteProduct")
    console.log(productId)

    let num = Object.values(productId)
    // Encontrar el índice del producto con el productId
    await productManager.deleteProduct(parseInt(num));
    io.emit("recibirProductos", productManager.getProducts());
  });
 
  socketServer.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
})