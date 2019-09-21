const environment = {
  mongodbUri: 'mongodb://localhost/productsApi',
  port: process.env.port || 3000,
  externalApi: (productId) => `http://redsky.target.com/v2/pdp/tcin/${productId}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`,
};

module.exports = environment;
