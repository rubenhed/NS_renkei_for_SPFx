url = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2203&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQPfXiFWOQ1f0L74Q4IJgs7S_r30-k_1px7C7Gx7jaYZ8"

data = {
  sql: `
    SELECT * 
    FROM classification
  `,
  params: []
}

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "User-Agent" : "Mozilla/5.0"
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  console.log(data.length);
  console.log(data);
  console.log(data.length);
})