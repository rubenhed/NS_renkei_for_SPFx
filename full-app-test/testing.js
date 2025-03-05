
const suiteqlUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2203&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQPfXiFWOQ1f0L74Q4IJgs7S_r30-k_1px7C7Gx7jaYZ8"
const params = [];
const type = "customer"

fetch(suiteqlUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "User-Agent" : "Mozilla/5.0",
  },
  body: JSON.stringify({
    params: params,
    type: type
  })
})
.then(response => response.json())
.then(data => {
  console.log(data); 
})