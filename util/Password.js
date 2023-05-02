const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString("hex");
    const hash = await scryptAsync(password, salt, 64);
    return `${hash.toString("hex")}.${salt}`;
  }
  static async toCompare(storedPassword, suppliedPassword) {
    const [hash, salt] = storedPassword.split(".");
    const buf = await scryptAsync(suppliedPassword, salt, 64);
    return buf.toString("hex") === hash;
  }
}

module.exports = Password;
