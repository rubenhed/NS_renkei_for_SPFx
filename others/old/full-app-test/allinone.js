
//https://cors-anywhere.herokuapp.com/corsdemo to enable heroku cors link

//CONST post data
const submitData = {
  estimate: {
    customerId: null,
    departmentId: null,
    departmentName: null,
    locationId: null,
    classificationId: null,
    subsidiaryId: null,
    subsidiaryName: null,
    items: [{
      itemId: 13061,
      quantity: 1,
      rate: 1000
    }]
  },
  file: {
    contents: null,
    encoding: "UTF-8",
    folderID: 23664, //SuiteScripts > SPFx_renkei > uploaded_files
    isOnline: true,
    description: "",
    fileType: "PDF",
    name: ""
  }
}

const nextItem = {
  displayname: null,
  itemId: null,
  quantity: null,
  rate: null
}

//FILE UPLOAD
const fileInput = document.querySelector("#file-upload");
const updateFileDisplay = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      const base64data = reader.result.split('base64,')[1];; // Base64 string (data URL format)
      //preview.textContent = `Selected file: ${base64data}`;
      //console.log(base64data);
      submitData.file.contents = base64data;
      submitData.file.name = file.name;
      console.log(file);
      console.log(submitData.file);
      
      
    };
  }
}

fileInput.addEventListener("change", updateFileDisplay);

//SQL GETS
const getRecordUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2209&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQIi0jfOnlwySoM-3-NKYjDHPPqlkBBTjswP-P9ys2RBI"

const subsidiary = document.querySelector("#subsidiary");
const getSubsidiary = (customerId) => {
  fetch(getRecordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify({
      id: customerId,
      type: "customer"
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    submitData.estimate.subsidiaryId = data.subsidiaryId;
    submitData.estimate.subsidiaryName = data.subsidiaryName;
    console.log(submitData);

    removeDisabled();
    subsidiary.value = submitData.estimate.subsidiaryName;
  })
}

const department = document.querySelector("#department");
const getDepartment = (classificationId) => {
  fetch(getRecordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0",
    },
    body: JSON.stringify({
      id: classificationId,
      type: "classification"
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    submitData.estimate.departmentId = data.departmentId;
    submitData.estimate.departmentName = data.departmentName;
    console.log(submitData);

    department.value = submitData.estimate.departmentName;
  })
}

const customer = (data, resultList, target) => {
  data.forEach(result => {
    const li = document.createElement('li');
    li.textContent = result.altname;
    li.style.cursor = 'pointer';
    resultList.appendChild(li);
    li.addEventListener('click', () => {
      target.value = li.textContent;
      submitData.estimate.customerId = result.id;
      resultList.innerHTML = "";
      console.log(submitData);

      getSubsidiary(submitData.estimate.customerId);
    });
  })
}

const classification = (data, resultList, target) => {  
  data.forEach(result => {
    if (result.subsidiary != submitData.estimate.subsidiaryId) return;
    
    const li = document.createElement('li');
    li.textContent = result.name;
    li.style.cursor = 'pointer';
    resultList.appendChild(li);
    li.addEventListener('click', () => {
      target.value = li.textContent;
      submitData.estimate.classificationId = result.id;
      resultList.innerHTML = "";
      console.log(submitData);

      getDepartment(submitData.estimate.classificationId);
    });
  })
}

const location_ = (data, resultList, target) => {
  data.forEach(result => {
    if (result.subsidiary != submitData.estimate.subsidiaryId) return;

    const li = document.createElement('li');
    li.textContent = result.name;
    li.style.cursor = 'pointer';
    resultList.appendChild(li);
    li.addEventListener('click', () => {
      target.value = li.textContent;
      submitData.estimate.locationId = result.id;
      resultList.innerHTML = "";
      console.log(submitData);
    });
  })
}

const item = (data, resultList, target) => {
  data.forEach(result => {
    if (result.subsidiary != submitData.estimate.subsidiaryId) return;

    const li = document.createElement('li');
    li.textContent = result.displayname;
    li.style.cursor = 'pointer';
    resultList.appendChild(li);
    li.addEventListener('click', () => {
      target.value = li.textContent;
      nextItem.itemId = result.id;
      nextItem.displayname = result.displayname;
      resultList.innerHTML = "";
      console.log(submitData);
      console.log(nextItem);
    });
  })
}


const suiteqlUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2210&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQVhNErAxA2RTx8ktjnsORgOoqu5T5GDRS7u-hhQFJ130"
const sqlSearch = (event) => {
  if (event.key !== "Enter") return;

  const type = event.target.id;
  const target = event.target;
  console.log("input:", target.value);
  const params = [`%${target.value}%`];
  //const params = [`7`];
  const resultList = event.target.parentElement.parentElement.nextElementSibling;
  resultList.innerHTML = "Loading...";

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
    resultList.innerHTML = "";
    switch ( type ) {
      case "customer":
        customer(data, resultList, target);
        break;
      case "classification":
        classification(data, resultList, target);
        break;
      case "location":
        location_(data, resultList, target);
        break;
      case "item":
        item(data, resultList, target);
        break;
    }
  })
}

const searchFields = document.querySelectorAll(".search-field")
searchFields.forEach(searchField => {
  searchField.addEventListener("keydown", sqlSearch);
})

const currentItems = document.querySelector("#current-items");

const addItem = (event) => {
  event.preventDefault();
  submitData.estimate.items.push(nextItem);
  console.log(submitData);

  const li = document.createElement('li');
  li.textContent = `${nextItem.displayname} - ${nextItem.quantity}個 - ${nextItem.rate}¥`;
  currentItems.appendChild(li);
}

const itemOptions = document.querySelectorAll(".item-option");
itemOptions.forEach(itemOption => {
  itemOption.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    switch ( event.target.id ) {
      case "quantity":
        nextItem.quantity = event.target.value;
        break;
      case "rate":
        nextItem.rate = event.target.value;
        break;
    }

    console.log(nextItem);
  })
});

const subfields = document.querySelectorAll(".subfield");
const removeDisabled = () => {
  subfields.forEach(subfield => {
    subfield.removeAttribute("disabled");
  })
}

const createUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2208&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQxyimjYBRdu6XxAFpMBY3EaxiZu7EsRPgy3PrV1IhXsU"

const submitForm = (event) => {
  event.preventDefault();
  console.log(submitData);

  fetch(createUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent" : "Mozilla/5.0"
    },
    body: JSON.stringify(submitData)
  })
  .then(response => response.json())
  .then(data => console.log(data))
}
