const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
      windowMs: 60000,
      max: 5,
      message: { message: 'Muitas solicitações vindas deste IP, tente novamente após 1 min.' },
      standardHeaders: true,
      legacyHeaders: false
});

module.exports = limiter;