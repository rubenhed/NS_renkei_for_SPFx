

url = "https://a4tmccseihkc5uhmkm23bd55z40oibbn.lambda-url.ap-northeast-1.on.aws/";

const suggestions = document.getElementById('suggestions');
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
    suggestions.innerHTML = '';
    data.items.forEach(item => {
      suggestions.innerHTML += `<option data-id="${item.id}">${item.companyname}</option>`;
    });
  });
}


const searchInput = document.getElementById('searchbox');
searchInput.addEventListener('input', (event) => {
  const query = event.target.value;
  if (query && query.length > 1) {
    console.log(query);
    fetchData(query);
    // fetchData(query);  // Fetch when there's text
  } else {
    // resultDiv.innerHTML = '';  // Clear results if input is empty
  }
});

searchInput.addEventListener('focusout', (event) => {
  const options = suggestions.children;
  if (options.length == 1 && options[0].value == searchInput.value) {
    console.log("its good");
  }
});