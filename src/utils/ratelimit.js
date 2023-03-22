const rateLimit = require("express-rate-limit");
 
 const limiter = rateLimit({
      windowMs: 60000,
      max: 5,
      message: 'Too many accounts created from this IP, please try again after an hour',
      standardHeaders: true,
      legacyHeaders: false
});

module.exports = limiter;