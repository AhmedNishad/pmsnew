let messageHash = '73787690|73797374|initiatePaymentCapture#sale|144|7500|   5f0d73757b69fd43dc64942c|EB1BDE02A037BF65|';

var crypto = require('crypto')
var sha1EncryptedHash = crypto.createHash('sha1')
sha1EncryptedHash.update(messageHash)

// Create buffer object, specifying binary as encoding
let bufferObj = Buffer.from(sha1EncryptedHash.digest('hash'), "utf8");
// Encode the Buffer as a base64 string
let base64String = bufferObj.toString("base64");
let message_hash = `CURRENCY:7:${base64String}`
console.log(message_hash)
console.log(base64String == 'tzl5eRB3CdPO34R1XUXU89oDDQ0=');