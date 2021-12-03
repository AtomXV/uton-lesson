const keythereum = require ('keythereum')

// 生成官方账号的私钥
function genPrivKey() {

    var pwd = "123"
    var keyObject = {"address":"096802f5b2658d0b953d280800644cc46d09568e","crypto":{"cipher":"aes-128-ctr","ciphertext":"a0d94adff05661b1f768c80c00ccbbb15f74444e768dbff7d2f2ce6d1c25fbc6","cipherparams":{"iv":"c79921bc472ca170ee3dc7207e5c4103"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"d19d91713caf3613c1da4c02ba95a41509b0577e084ccb02808cb0ef39e599ae"},"mac":"c9f8aa06ad8695df02152f366b541216a7482b8d990e2034036145d90580b88b"},"id":"294ecb4f-a029-4978-9f50-a83077e777ac","version":3};
    var privateKey = keythereum.recover(pwd, keyObject);
    console.log(privateKey.toString('hex'));
}

genPrivKey()