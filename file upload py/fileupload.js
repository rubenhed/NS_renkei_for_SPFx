url = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2201&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQCAILX53RoHuenwO70qnsJC-4kuOb4G47Y3L50UpzNmU";

const fs = require('fs');
fs.readFile('test123.pdf', (err, data) => {

  const encoded_pdf_str = data.toString('base64');
  data = {
    "encoding": "UTF-8",
    "function": "fileCreate",
    "folderID": 20757,
    "contents": encoded_pdf_str,
    "isOnline": true,
    "description": "A test file.",
    "name": "NEWTEST.pdf",
    "fileType": "PDF"
  }
  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "tekito" //"Mozilla/5.0"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log(data))

});


