const User = require('../models/user');

exports.getAddUser = (req, res, next) => {
  res.render('user/add-user', {
    pageTitle: 'Add User',
    path: '/user/add-user'
  });
};

exports.postAddUser = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const phone = req.body.phone;

    const data = await User.create({
      emailId: emailId,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    });

    res.status(201).json({ newUserDetails: data });
    console.log('Added to server');
  } catch (err) {
    res.status(500).json({ error: err });
    console.error(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const result = await User.destroy({
      where: { id: userId }
    });

    res.status(200).json({ message: 'User deleted successfully', result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
