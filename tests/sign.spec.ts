describe('sign', () => {
    const jsigs = require('jsonld-signatures');
    var testDocument = {
        "@context": {
            schema: 'http://schema.org/',
            name: 'schema:name',
            homepage: 'schema:url',
            image: 'schema:image'
        },
        name: 'Manu Sporny',
        homepage: 'https://manu.sporny.org/',
        image: 'https://manu.sporny.org/images/manu.png'
    };


    fit('should sign', async () => {
        var publicKeyPem =
            '-----BEGIN PUBLIC KEY-----\r\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9r+U2fzyiI3SqrK8v58E\r\n' +
            '4Vof2uF/UDQnP2/c3CB48xio8f4d+JvOSgTal1NdwrwbpBEC7h0j84iX6rEikV0c\r\n' +
            'YEHRTq5A8c7DtOCSUJ1qLn4l5Py/CPn6wty7d6sO/Fa/r6ZIq9PHOU/LymzmoFBy\r\n' +
            'yUuiMf7M0wZgoofWGRl7v2HGz/hgwKEXQM5xKgfmrPfIkqy/ijPbksKDaN8tVyiE\r\n' +
            'IeH780iujRZAMBjnwF3pm43VoKEjXgu/pyLVgVLZk1VmyRZD94zFcpcBFFEFGmrP\r\n' +
            'GfhCLQq4FmZ9ILEhJqXnJgAQOH+fpOemT2jci1rFR61CBi0TchCVTJYe0OiBpexS\r\n' +
            'nwIDAQAB\r\n' +
            '-----END PUBLIC KEY-----';
        var privateKeyPem = '-----BEGIN RSA PRIVATE KEY-----\r\n' +
        'MIIEpAIBAAKCAQEA9r+U2fzyiI3SqrK8v58E4Vof2uF/UDQnP2/c3CB48xio8f4d\r\n' +
'+JvOSgTal1NdwrwbpBEC7h0j84iX6rEikV0cYEHRTq5A8c7DtOCSUJ1qLn4l5Py/\r\n' +
'CPn6wty7d6sO/Fa/r6ZIq9PHOU/LymzmoFByyUuiMf7M0wZgoofWGRl7v2HGz/hg\r\n' +
'wKEXQM5xKgfmrPfIkqy/ijPbksKDaN8tVyiEIeH780iujRZAMBjnwF3pm43VoKEj\r\n' +
'Xgu/pyLVgVLZk1VmyRZD94zFcpcBFFEFGmrPGfhCLQq4FmZ9ILEhJqXnJgAQOH+f\r\n' +
'pOemT2jci1rFR61CBi0TchCVTJYe0OiBpexSnwIDAQABAoIBAGGTCQ3a1R3i13fh\r\n' +
'DnrIK2nh9c7cdTgGJ68SUUhLHwkiq0xmrPtuwXjLypUkxmMHd/a9M2dt5pWbYlfQ\r\n' +
'jFbndx0padevWMdGeGXCmJmAZkjUYa/XssOd9uev2gJMhrSKqWqQWxR3vsSPJYt6\r\n' +
'3QhwR7QKUK1skRqx3uzmwmdSiHj5LpqX/PgqPYux5F5qKiK9PvvYOi1xyDu+xG59\r\n' +
'f2FgyqEr72nn1vjZlT/gwLe9duqNNdj87UGwBWR6bP8UDRtx0YBrv8TXqmG+0wDN\r\n' +
'wBPdVAsiRsEOG3tTS7dzoiiZ86zCvqcL5CzysRrF0UwcDtMUsf6Jy2RpLPmjnjjO\r\n' +
'0RLsUiECgYEA+8JKCJkKtscmQnGLu8O0Aff/iPUGq5IcTV54mjFSmhxVPNgLAScY\r\n' +
'Xiw9UQjALSKNIEX5wj0lIQP1TOmE4RqtHTmzFyCH55THC0W+VlS3sJLQwPcMidPm\r\n' +
'4PwDWBj1uIa+UHxrVwrhV5VbEnYOM1n9T7LQm/BS5r69LDHkX4o+CC0CgYEA+uev\r\n' +
'I4/ydosgfyojBcK/E5pULA5ST/4NI4lVpSMRa2esRYJL2oO9LjhFUVQuhb99zOG4\r\n' +
'CArC6OBEAGEb90p6Z30AeLy1nNrWRlYr8S0rHnHBWMvk2Ri+/0Ce1XU/sB3UivfW\r\n' +
'Dzi3lCzExSAIdh7OSAkKa5eBsEPLrEj82CnaGXsCgYEA3iQiNRHtDTgN/0S3OjdF\r\n' +
'hxMva8ZgW1UyGeaI3e01aHwljelHVH4Nl1LLy8u/3lOFWPvFlGllcItQj8vhDsr+\r\n' +
'AzKdXoO6x1FUjBK/DufzqR7yicGzU44hQ1W7Ean8bxSdquENyaD1EtXbpR98Cj2W\r\n' +
'MROj1GSqkaWtv+hKDS8q6wUCgYBQIhzCi9/RUn/vfUKwPVGPbjPB2lUZrTb/CYar\r\n' +
'9jZDClpv3LxjLr4F+/zPi8ZL+yuvesuu7djwTWgKgvlOkp/jW34CEasjTJUw46an\r\n' +
'IVjrIUOyG3ScjZW6qiXQYOEVW4GdXKgmNmQTU/UITEHHj/Er+o80a7AE3rI29Ryj\r\n' +
'4UIB7wKBgQC/7C1z4AhYWjCCAEWemsVW4svp3t14Q2ef6pF/B7laV6U3jCrBgy53\r\n' +
'28beShhTxLdmZJMkFRsjYtT8oo9XnmCVy7OLqKJlROqnOm6TNxl5pgOZo1RrzvDO\r\n' +
'4RfUANohp3XaY5cRcxUsZ4H8GZWumRkuDikt4P2DBk/7Z7tFIlQ7nA==\r\n' +
            '-----END RSA PRIVATE KEY-----';


        // specify the public key object
        const publicKey = {
            '@context': jsigs.SECURITY_CONTEXT_URL,
            type: 'RsaVerificationKey2018',
            id: 'https://example.com/i/alice/keys/1',
            controller: 'https://example.com/i/alice',
            publicKeyPem
        };

        // specify the public key controller object
        const controller = {
            '@context': jsigs.SECURITY_CONTEXT_URL,
            id: 'https://example.com/i/alice',
            publicKey: [publicKey],
            // this authorizes this key to be used for making assertions
            assertionMethod: [publicKey.id]
        };

        // create the JSON-LD document that should be signed
        const doc = {
            '@context': {
                schema: 'http://schema.org/',
                name: 'schema:name',
                homepage: 'schema:url',
                image: 'schema:image'
            },
            name: 'Manu Sporny',
            homepage: 'https://manu.sporny.org/',
            image: 'https://manu.sporny.org/images/manu.png'
        };

        // sign the document as a simple assertion
        const { RsaSignature2018 } = jsigs.suites;
        const { AssertionProofPurpose } = jsigs.purposes;
        const { RSAKeyPair } = require('crypto-ld');
        const { documentLoaders } = require('jsonld');

        const key = new RSAKeyPair({ ...publicKey, privateKeyPem });
        const signed = await jsigs.sign(doc, {
            suite: new RsaSignature2018({ key }),
            purpose: new AssertionProofPurpose()
        });

        console.log('Signed document:', signed);
        // we will need the documentLoader to verify the controller
        const { node: documentLoader } = documentLoaders;

        // verify the signed document
        const result = await jsigs.verify(signed, {
            documentLoader,
            suite: new RsaSignature2018(key),
            purpose: new AssertionProofPurpose({ controller })
        });
        if (result.verified) {
            console.log('Signature verified.');
        } else {
            console.log('Signature verification error:', result.error);
        }
        expect(result.verified).toBeTruthy();
    });
})