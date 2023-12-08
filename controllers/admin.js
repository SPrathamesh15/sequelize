const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log('Request Body:', req.body);

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  console.log('req.existingUser:', req.existingUser);

  req.existingUser.createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      // newUserId: req.existingUser.id this is also the same method to specify the userId
    })
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.existingUser.getProducts({where: {id:prodId}})
  // Product.findByPk(prodId) this one is old approach
  .then(products => {
    const product = products[0]
    if(!product){
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  }).catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product =>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save() // this method is also provided by sequelize
  })
  .then(result=>{
    console.log('Updated Products Successfully!')
    res.redirect('/admin/products')
  })
    .catch((err) => console.log(err));
};


exports.getProducts = (req, res, next) => {
  req.existingUser.getProducts()
  // Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err=>console.log(err));
    
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy() // it is a sequelize method which delete the data from database
  })
  .then(result => {
    console.log('Deleted the Products Successfully!!')
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err));
};
