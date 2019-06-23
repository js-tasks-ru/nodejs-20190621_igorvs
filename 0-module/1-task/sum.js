function sum(a, b) {
  /* ваш код */
  try {
    if ( typeof(a) !== "number" || typeof(b) !== "number") {
      throw new TypeError("Неверный формат");
    }
    return a+b;
  } catch (e) {
      throw e;
  }
}

module.exports = sum;
