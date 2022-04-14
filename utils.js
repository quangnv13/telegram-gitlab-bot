function makeid(length) {
  var result = '';
  var characters = '55678090STUVWXYZabcdeABCDEFGHIJKLMNOPQR123455678090STUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const utils = { makeid };

module.exports = utils;
