require('dotenv').config();  // Load dotenv to read environment variables
const crypto = require('crypto');

// Define constants
const algorithm = 'aes-256-ctr';
const IV_SIZE = 16; // IV size for AES-256-CTR (16 bytes)
const KEY_SIZE = 32; // Key size for AES-256 (32 bytes)

// Load the secret key from the environment variable
const secretKey = process.env.ENCRYPTION_KEY;

// Validate the secret key
if (!secretKey || secretKey.length !== KEY_SIZE * 2) { // Hex key length is twice the byte size
    throw new Error(`ENCRYPTION_KEY must be a ${KEY_SIZE * 2}-character hexadecimal string.`);
}

const keyBuffer = Buffer.from(secretKey, 'hex');

// Encryption function
function encrypt(text) {
    const iv = crypto.randomBytes(IV_SIZE); // Generate a new IV for each encryption
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex'),
    };
}

// Decryption function
function decrypt(hash) {
    if (!hash || !hash.iv || !hash.content) {
        throw new Error('Invalid hash object. Must contain iv and content.');
    }

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
}

module.exports = { encrypt, decrypt };
