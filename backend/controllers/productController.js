import Product from '../models/Products.js';
import cloudinary from '../lib/cloudinary.js';

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// POST a new product
const createProduct = async (req,res) => {
  try {
    //console.log('Received request body:', req.body);
    const { name, price, desc, img } = req.body;
    
    if (!name || !price || !desc || !img) {
       console.log('Missing fields:', { name, price, desc, img });
      return res.status(400).json({ error: 'All fields (name, price, desc, img) are required' });
    }
    let imgUrl="";
    //upload image to claudinary and get image url
    if(img)
    { 
       //Upload base64 image to cloudinary
           const uploadResponse=await cloudinary.uploader.upload(img);
            console.log(uploadResponse)
           imgUrl=uploadResponse.secure_url;
    }
    //console.log(imgUrl)
    const newProduct = new Product({ name, price, desc, img:imgUrl });
    await newProduct.save();
    //console.log(newProduct)
    res.status(201).json(newProduct);

  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create products', details: error.message });
    }
  }
};

export {getAllProducts, createProduct};
