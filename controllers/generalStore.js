const Product = require('../models/generalStore');

exports.getAddProduct = (req, res, next) => {
  res.render('generalStore/add-product', {
    pageTitle: 'Add product',
    path: '/generalStore/add-product'
  });
};

exports.postAddProduct = async (req, res, next) => {
    try {
      const productname = req.body.productname;
      const productDescription = req.body.productDescription;
      const productprice = req.body.productprice;
      const productquantity = req.body.productquantity;
  
      const data = await Product.create({
        productname: productname,
        productDescription: productDescription,
        productprice: productprice,
        productquantity: productquantity  // Ensure this value is not null
      });
      console.log(data)
      res.status(201).json({ newProductDetails: data });
      console.log('Added to server');
    } catch (err) {
      console.error('Error in postAddProduct:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ allProducts: products });
    console.log('products retrieved')
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateProductQuantity = async (req, res, next) => {
    try {
      const productId = req.params.productId; 
      console.log(productId)
      const updatedProductDetails = req.body;
      console.log(updatedProductDetails);

      const [numOfRowsUpdated, updatedProduct] = await Product.update(updatedProductDetails, {
        where: { id: productId },
        returning: true, 
      });
      
      if (numOfRowsUpdated === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json({ updatedProduct });
    } catch (err) {
      console.error('Error in updateProductQuantity:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
