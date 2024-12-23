require('dotenv').config();  //load dotenv that tells file to look at the env file and read requested variable

const crypto = require('crypto'); 
const algorithm = 'aes-256-ctr'; 

//load the secret key from the enviroment variable 
const secretKey = process.env.ENCRYPTION_KEY; 

//throw an error if the secret key is not set 
if (!secretKey || secretKey.length !== 64) { 
    throw new Error('ENCRYPTION_KEY enviroment variable is not set');
}

const keyBuffer = Buffer.from(secretKey, 'hex');

const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]); 

    return { 
        iv: iv.toString('hex'), 
        content: encrypted.toString('hex')
    }; 
} 

function decrypt(hash) { 
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]); 

    return decrypted.toString();
}

module.exports = {encrypt, decrypt}; 
