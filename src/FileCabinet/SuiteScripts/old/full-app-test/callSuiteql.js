
//https://cors-anywhere.herokuapp.com/corsdemo to enable heroku cors link
const url = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2203&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQPfXiFWOQ1f0L74Q4IJgs7S_r30-k_1px7C7Gx7jaYZ8"
const customerInput = document.querySelector("#customer");
const customerList = document.querySelector("#customer-list");

const departmentInput = document.querySelector("#department");
const departmentList = document.querySelector("#department-list");

const locationInput = document.querySelector("#location");
const locationList = document.querySelector("#location-list");

const bumonInput = document.querySelector("#bumon");
const bumonList = document.querySelector("#bumon-list");

const customerData = {
  sql: `
    SELECT * 
    FROM customer
    WHERE customer.altname LIKE ?
  `,
  params: []
}

const getCustomer = (event) => {
  if (event.key !== "Enter") return;

  const input = event.target.value;
  console.log("input:", input);
  customerData.params = [`%${input}%`];
  customerList.innerHTML = "Loading...";

  //return;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify(customerData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    console.log(data);
    customerList.innerHTML = "";
    data.forEach(customer => {
      const li = document.createElement('li');
      li.textContent = customer.altname;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        customerInput.value = customer.altname;
        customerInput.dataset.id = customer.id;
        customerList.innerHTML = "";
      });
      customerList.appendChild(li);
    });
  })
}

const departmentData = {
  sql: `
    SELECT * 
    FROM department
    WHERE department.name LIKE ?
  `,
  params: []
}

const getDepartment = (event) => {
  if (event.key !== "Enter") return;

  const input = event.target.value;
  console.log("input:", input);
  departmentData.params = [`%${input}%`];
  departmentList.innerHTML = "Loading...";

  //return;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify(departmentData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    console.log(data);
    departmentList.innerHTML = "";
    data.forEach(department => {
      const li = document.createElement('li');
      li.textContent = department.name;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        departmentInput.value = department.name;
        departmentInput.dataset.id = department.id;
        departmentList.innerHTML = "";
      });
      departmentList.appendChild(li);
    });
  })
}

const locationData = {
  sql: `
    SELECT * 
    FROM location
    WHERE location.name LIKE ?
  `,
  params: []
}

const getLocation = (event) => {
  if (event.key !== "Enter") return;

  const input = event.target.value;
  console.log("input:", input);
  locationData.params = [`%${input}%`];
  locationList.innerHTML = "Loading...";

  //return;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify(locationData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    console.log(data);
    locationList.innerHTML = "";
    data.forEach(location => {
      const li = document.createElement('li');
      li.textContent = location.name;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        locationInput.value = location.name;
        locationInput.dataset.id = location.id;
        locationList.innerHTML = "";
      });
      locationList.appendChild(li);
    });
  })
}

const bumonData = {
  sql: `
    SELECT * 
    FROM classification
    WHERE classification.name LIKE ?
  `,
  params: []
}

const getBumon = (event) => {
  if (event.key !== "Enter") return;

  const input = event.target.value;
  console.log("input:", input);
  bumonData.params = [`%${input}%`];
  bumonList.innerHTML = "Loading...";

  //return;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify(bumonData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    console.log(data);
    bumonList.innerHTML = "";
    data.forEach(bumon => {
      const li = document.createElement('li');
      li.textContent = bumon.name;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        bumonInput.value = bumon.name;
        bumonInput.dataset.id = bumon.id;
        bumonList.innerHTML = "";
      });
      bumonList.appendChild(li);
    });
  })
}

customerInput.addEventListener("keydown", getCustomer);
departmentInput.addEventListener("keydown", getDepartment);
locationInput.addEventListener("keydown", getLocation);
bumonInput.addEventListener("keydown", getBumon);