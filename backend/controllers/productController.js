import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1 ;

    const keyword = req.query.keyword ? { name : { $regex: req.query.keyword , $options :  'i'}} : {};
    const count = await Product.countDocuments({ ...keyword });
    
    const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({products , page, pages: Math.ceil(count/pageSize)});
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
    const { name, price, image, description, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.price = price;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct)
    }
    else {
        res.status(404);
        throw new Error('product not found');
    }
})

// @desc Delete a Product
// @route Delete /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'product deleted' });
    }
    else {
        res.status(404);
        throw new Error('product not found');
    }
})


// @desc new review
// @route POST /api/products/:id/review
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewd = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewd) {
            res.status(404);
            throw new Error('product already review');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review Added' });
    }
    else {
        res.status(404);
        throw new Error('product not found');
    }

})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products);
})
export { getProducts, getProductsByID, createProduct, updateProduct, deleteProduct, createProductReview , getTopProducts };