const productService = require("../services/productService");

const { invalidateCache } = require("../middleware/cacheMiddleware");


async function getAllProducts(req, res) {
    try {

        const products = await productService.getAllProducts();

        res.json(products);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get products"
        });

    }
}


async function getProductById(req, res) {
    try {

        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get product"
        });

    }
}


async function createProduct(req, res) {
    try {

        const product = await productService.createProduct(req.body);

        invalidateCache();

        res.status(201).json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create product"
        });

    }
}


async function updateProduct(req, res) {
    try {

        const id = Number(req.params.id);

        const product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        invalidateCache();

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update product"
        });

    }
}


async function patchProduct(req, res) {
    try {

        const id = Number(req.params.id);

        const product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        invalidateCache();

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to patch product"
        });

    }
}


async function deleteProduct(req, res) {
    try {

        const id = Number(req.params.id);

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        invalidateCache();

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete product"
        });

    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};