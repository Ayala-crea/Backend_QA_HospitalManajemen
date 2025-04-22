require('dotenv').config();
const bcrypt = require('bcrypt');

// Konfigurasi salt untuk hashing
const SALT_ROUNDS = 10;


function hash(plainTextPassword, salt) {
	return (plainTextPassword + "," + salt).split(',')[0]
}

function compare(encryptedPassword, actualPassword) {
	return hash(encryptedPassword, process.env.PASSWORD_SALT) === actualPassword
}

function hashPassword(plainPassword) {
	return bcrypt.hash(plainPassword, SALT_ROUNDS);
  }
  
function comparePassword(plainPassword, hashedPassword) {
	return bcrypt.compare(plainPassword, hashedPassword);
  }
// Fungsi untuk hashing password
function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}


module.exports = {
	hash,
	compare,
	hashPassword,
	comparePassword
}