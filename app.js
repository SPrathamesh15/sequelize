const path = require('path');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product')
const newUser = require('./models/newUser')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());  // Add this line for JSON support
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  newUser.findByPk(1)
  .then(existingUser => {
    console.log('existinguser has benn created', existingUser)
    req.existingUser = existingUser;
    next();
  })
  .catch(err => console.log('existing user is not get',err))
})
app.use(cors())
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

app.use(errorController.get404);

Product.belongsTo(newUser, {constraints: true, onDelete: 'CASCADE'})
newUser.hasMany(Product) // this relation is similar to above line

sequelize
    // .sync({force: true})
    .sync() // Uncomment this line to force synchronization
    .then(result => {
      console.log(newUser.findByPk(1))
        return newUser.findByPk(1);
        
    })
    .then(existingUser => {
        if (!existingUser) {
            // User not found, create a new one
            console.log('new User is created!!')
            return newUser.create({ name: 'Prathamesh', email: 'email@email.com' });
        }
        // User found, return it
        console.log('Existing user found', existingUser)
        return existingUser;
    })
    .then(existingUser => {
        console.log('existing user in server', existingUser); 
        app.listen(3000);
        console.log('Server is running on port 3000');
    })
    .catch(err => console.log(err));


