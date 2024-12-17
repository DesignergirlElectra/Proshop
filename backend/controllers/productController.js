import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products)
})
const getProductsByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error("Resource not found");
    }
})

// create product
//@route post/api/product/
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product(
        {
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample Brand',
            category: 'Sample Category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample descreption'
        }
    )
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
})

// @desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name , price, image ,description , brand , category , countInStock} = req.body
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.image = image;
        product.description = description;
        product.price = price;
        product.brand = brand;
        product.category = category;
        product.countInStock =countInStock;
        
        const updatedProduct = await product.save();
        res.json(updatedProduct)
    }
   else{
    res.status(404);
    throw new Error('product not found');
   }
})

// @desc Delete a Product
// @route Delete /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){        
        const deleteProduct = await Product.deleteOne({_id : req.params.id});
        res.status(200).json({message :'product deleted'});
    }
   else{
    res.status(404);
    throw new Error('product not found');
   }
})
export { getProducts, getProductsByID, createProduct , updateProduct , deleteProduct};