const rateLimit = require("express-rate-limit");
 
 const limiter = rateLimit({
      windowMs: 60000,
      max: 5,
      message: {message: 'Too many API requests from this IP, please try again after 1 min.'},
      standardHeaders: true,
      legacyHeaders: false
});

module.exports = limiter;