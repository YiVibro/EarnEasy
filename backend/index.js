import express from 'express';
import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRoutes.js';
import sessionRouter from './routes/sessionRoutes.js';
import './models/dbConnections.js'
import cors from 'cors';
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config();
console.log(process.env.CLOUDINARY_API_KEY)

app.use(express.json());
app.get('/',(req, res) => {

    res.json({
        message: 'Hello from the backend!'
    });
});



app.use('/auth', authRouter);
app.use('/session', sessionRouter);
app.use('/products',(req,res,next)=>{console.log(req.url);next()}, productRouter);


//TODOs
//In /routes folder define all the routes in  file
//Add  app.use('/route-name', specific route); for all routes
//eg app.use('/products', productRouter)
//eg app.use('/cart', cartRouter)
//eg app.use('/reviews', reviewRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
