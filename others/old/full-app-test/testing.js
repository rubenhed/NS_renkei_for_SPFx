
const suiteqlUrl = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2210&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQVhNErAxA2RTx8ktjnsORgOoqu5T5GDRS7u-hhQFJ130"
const params = [`%%`];;
const type = "item"

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