function generate_keys() {
  (async () => {
    const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIds: [{ name: 'a', email: 'a@example.com' }] // you can pass multiple user IDs
    });

    document.getElementById('send-prv').innerText = privateKeyArmored;
    document.getElementById('send-pub').innerText = publicKeyArmored;
  })(); 

  (async () => {
    const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIds: [{ name: 'a', email: 'b@example.com' }] // you can pass multiple user IDs
    });

    document.getElementById('recv-prv').value= privateKeyArmored;
    document.getElementById('recv-pub').value = publicKeyArmored;
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

    document.getElementById('crypted').value = encrypted;

  })();
}

function decrypt() {
  (async () => {
    const receive_private_key_armored = document.getElementById('recv-prv').value;
    const receive_private_key = await openpgp.readKey({armoredKey: receive_private_key_armored});

    const message = await openpgp.readMessage({
      armoredMessage: document.getElementById('crypted').value
    });
    const { data: decrypted } = await openpgp.decrypt({
      message,
      privateKeys: receive_private_key
    })

    document.getElementById('decrypted').value = decrypted;

  })();
}

function crypt_file() {
  (async () => {
    const receive_public_key_armored = document.getElementById('recv-pub').value;
    const receive_public_key = await openpgp.readKey({armoredKey: receive_public_key_armored})

    let crypt_button = document.getElementById("crypt_button");
    crypt_button.onchange = function () {
      file = crypt_button.files[0];
      let file_reader = new FileReader();
      
      file_reader.onload = function() {
        let binary = new Uint8Array(file_reader.result);  

        const message = openpgp.Message.fromBinary(binary);

        const encrypted =  openpgp.encrypt({
          message: message,
          publicKeys: receive_public_key
        });
      }

      file_reader.readAsArrayBuffer(file);
      console.log(file_reader);
    }
  })
}


