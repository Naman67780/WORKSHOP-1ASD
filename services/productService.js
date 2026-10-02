const {
    readData,
    writeData
} = require("../Database/productDatabase");


async function getAllProducts() {

    return await readData();

}


async function getProductById(id) {

    const products = await readData();

    const product = products.find(
        (product) => product.id === id
    );

    return product;

}


async function createProduct(productData) {

    const products = await readData();

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,

        name: productData.name,

        price: productData.price
    };

    products.push(newProduct);

    await writeData(products);

    return newProduct;

}


async function updateProduct(id, productData) {

    const products = await readData();

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData,
        id: id
    };

    await writeData(products);

    return products[index];

}


async function deleteProduct(id) {

    const products = await readData();

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeData(products);

    return deletedProduct;

}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};