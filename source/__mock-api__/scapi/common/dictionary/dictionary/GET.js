const fs = require('fs');
const path = require('path');

function returnResponse(request, response) {


  let pathParam = request.query.path;

  pathParam = pathParam.slice(1); // remove the first char, as it is a /
  
  const targetFilename = `Paths/${pathParam}.json`;

  let filePath = path.join(__dirname, targetFilename);

	// If file does not exist then respond with default data
	try {
		fs.accessSync(filePath);
	} catch (err) {
		filePath = path.join(__dirname, 'GET_default.json');
  }
  
  return response.sendFile(filePath);
	
}

module.exports = returnResponse;
