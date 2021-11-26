const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const axios = require('axios');

exports.getMetadataCustom = async (data) => {
    let url = data.content_url;
    const response = await axios(url,{mode:'no-cors'});
    //const html = response.text();
    const doc = domino.createWindow(response).document;
    const metadata = getMetadata(doc, url);
    data.metadata = JSON.stringify(metadata);
    return data
   
}