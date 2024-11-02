const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_KEY = 'd01cf3b7bd4fe4a6280b';
const API_SECRET = '0d384759a3b50f1f418e7a3154a563afa10e705512dc2dbc9ac0dd73cb4d3326';
const filePath = './snorlax.jpg';

async function uploadToPinata() {
    try {
        const data = new FormData();
        data.append('file', fs.createReadStream(filePath)); // Uses ReadStream, which works with form-data

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            maxBodyLength: Infinity, 
            headers: {
                ...data.getHeaders(), // This includes the boundary for multipart form data
                'pinata_api_key': API_KEY,
                'pinata_secret_api_key': API_SECRET,
            }
        });

        console.log('File uploaded to IPFS:', response.data.IpfsHash);
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
    }
}

uploadToPinata();
