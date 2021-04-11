function generate_keys() {
  (async () => {
    const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIds: [{ name: 'a', email: 'a@example.com' }], // you can pass multiple user IDs
        passphrase: 'super long and hard to guess secret' // protects the private key
    });

    document.getElementById('send-prv').innerText = privateKeyArmored;
    document.getElementById('send-pub').innerText = publicKeyArmored;
  })(); 

  (async () => {
    const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIds: [{ name: 'a', email: 'b@example.com' }], // you can pass multiple user IDs
        passphrase: 'super long and hard to guess secret' // protects the private key
    });

    document.getElementById('recv-prv').innerText = privateKeyArmored;
    document.getElementById('recv-pub').innerText = publicKeyArmored;
  })(); 
}


function crypt() {
  (async () => {
    const receive_public_key_armored = document.getElementById('recv-pub').value;
    const receive_public_key = await openpgp.readKey({armoredKey: receive_public_key_armored})

    const encrypted = await openpgp.encrypt({
      message: openpgp.Message.fromText(document.getElementById('message').value),
      publicKeys: receive_public_key
    });

    document.getElementById('crypted').innerText = encrypted;

  })();
}
