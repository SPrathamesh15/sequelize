const Review = require('../models/review');

exports.getAddReview = (req, res, next) => {
    res.render('review/add-review', {
        pageTitle: 'Add User',
        path: '/review/add-review'
    });
};

exports.postAddReview = async (req, res, next) => {
    try {
      const CompanyName = req.body.companyName;
      const Pros = req.body.Pros;
      const Cons = req.body.Cons;
      const Stars = req.body.Stars;
  
      const reviewData = await Review.create({
        companyName: CompanyName,
        pros: Pros,
        cons: Cons,
        stars: Stars
      });
  
      res.status(201).json({ newReviewDetails: reviewData });
      console.log('Added to server');
    } catch (err) {
      res.status(500).json({ error: err });
      console.error(err);
    }
  };

  exports.getAllReviews = async (req, res, next) => {
    try {
      const Reviews = await Review.findAll();
      res.status(200).json({ allReviews: Reviews });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  // Adding a new route to handle reviews by company name
exports.getReviewsByCompany = async (req, res, next) => {
  try {
      const companyName = req.query.companyName;

      // Using the company name to filter reviews
      const reviews = await Review.findAll({
          where: {
              companyName: companyName
          }
      });
      console.log(reviews)
      res.status(200).json({ allReviews: reviews });
  } catch (err) {
      res.status(500).json({ error: err });
  }
};
