
//https://cors-anywhere.herokuapp.com/corsdemo to enable heroku cors link
const createUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2202&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQ2WikcsMm1rnFfVmA42QpaSJaZJetnpqqeOzdjV1Qljs";


const submitForm = (event) => {
  event.preventDefault();

  const customerId = document.querySelector("#customer").dataset.id;
  const departmentId = document.querySelector("#department").dataset.id;
  const locationId = document.querySelector("#location").dataset.id;
  const bumonId = document.querySelector("#bumon").dataset.id;

  console.log(customerId);
  console.log(departmentId);
  console.log(locationId);
  console.log(bumonId);

  const data = {
    customerId: customerId,
    department: departmentId,
    location: locationId,
    class: bumonId,
    itemId: 3108,
    quantity: 1,
    rate: 1000.0
  }

  fetch(createUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    return response.text();
  })
  .then(data => console.log(data))
}