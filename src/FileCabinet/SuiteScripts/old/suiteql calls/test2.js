url = "https://a4tmccseihkc5uhmkm23bd55z40oibbn.lambda-url.ap-northeast-1.on.aws/";

const fetchData = (query) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}

fetchData("apa");