var crypto = require('crypto-js');
const NodeRSA = require('node-rsa');

function hashMessage(message, algo, secretKey){

    if (message == null || message == undefined || message == ""){
        return "Message vide";
    }
    var encrypted = "";
    try {
        switch (algo) {
            case "md5":
                encrypted = crypto.HmacMD5(message, secretKey).toString();
                break;
            case "sha256":
                encrypted = crypto.HmacSHA256(message, secretKey).toString();
                break;
            case "aes":
                encrypted = crypto.AES.encrypt(message, secretKey).toString();
                break;
            case "ripeMD160":
                encrypted = crypto.RIPEMD160(message, secretKey).toString();
                break;
            case "rsa":
                const key = new NodeRSA({b: 512});
                encrypted = key.encrypt(message, 'base64');
                break;
            };

        console.log(secretKey);
        return encrypted;

    } catch (error) {
        return error;
    }
}

function decryptMessage(message, algo,secretKey){

    if (message == null || message == undefined || message == ""){
        return "Message vide";
    }
    
    var decrypted = "";
    try {
        switch (algo) {
            case "aes":
                decrypted = crypto.AES.decrypt(message, secretKey).toString();
                break;
            case "rsa":
                const key = new NodeRSA({b: 512});
                decrypted = key.decrypt(message, 'utf8');
                break;
        };

        return decrypted;

    } catch (error) {
        return error;
    }
}

function hashFile(file, algo){

    if (message == null || message == undefined || message == ""){
        return "Message vide";
    }
    
    try {
        
        var encrypted = crypto.createHash(algo).update(message).digest('hex');
        return encrypted;

    } catch (error) {
        return error;
    }
}

module.exports = { hashMessage, hashFile, decryptMessage }