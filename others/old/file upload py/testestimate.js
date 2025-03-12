url = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2202&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQ2WikcsMm1rnFfVmA42QpaSJaZJetnpqqeOzdjV1Qljs";

data = {
  "customerId": 21477,
  "department": 34,
  "location": 10,
  "class": 69,
  "itemId": 3108,
  "quantity": 1,
  "rate": 1000.0
}

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent" : "Mozilla/5.0"
  },
  //body: JSON.stringify(data)
})
.then(response => {
  return response.json();
})
.then(data => console.log(data))