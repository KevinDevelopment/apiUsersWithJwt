module.exports = validateEmail = (email) => {
  const regexPatternTovalidateEmail = /\S+@\S+\.\S+/;
  return regexPatternTovalidateEmail.test(email);
};