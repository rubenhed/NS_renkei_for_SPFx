
//https://cors-anywhere.herokuapp.com/corsdemo to enable heroku cors link

console.log("Suitescript connector connected");

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
    items: []
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
const getRecordUrl = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2209&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQIi0jfOnlwySoM-3-NKYjDHPPqlkBBTjswP-P9ys2RBI"

const subsidiary = document.querySelector("#subsidiary");
const getSubsidiary = (customerId) => {
  addDisabled();

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

const createListItem = () => {
  const li = document.createElement('li');
  li.style.cursor = 'pointer';
  li.classList.add("list-group-item", "list-group-item-action");
  return li;
}

const customer = (data, resultList, target) => {
  data.forEach(result => {
    const li = createListItem();
    li.textContent = result.altname;
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
    
    const li = createListItem();
    li.textContent = result.name;
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

    const li = createListItem();
    li.textContent = result.name;
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

    const li = createListItem();
    li.textContent = result.displayname;
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


const suiteqlUrl = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2210&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQVhNErAxA2RTx8ktjnsORgOoqu5T5GDRS7u-hhQFJ130"
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

const quantity = document.querySelector("#quantity");
const rate = document.querySelector("#rate");

const addItem = (event) => {
  
  event.preventDefault();
  nextItem.quantity = quantity.value;
  nextItem.rate = rate.value;

  submitData.estimate.items.push(structuredClone(nextItem));
  console.log(submitData);

  const li = document.createElement('li');
  li.classList.add("list-group-item");
  li.textContent = `${nextItem.displayname} - ${nextItem.quantity}個 - ¥${nextItem.rate}`;
  currentItems.appendChild(li);
}
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addItem);

const subfields = document.querySelectorAll(".subfield");
const addDisabled = () => {
  subfields.forEach(subfield => {
    subfield.disabled = true;
  })
}

const removeDisabled = () => {
  subfields.forEach(subfield => {
    subfield.value = "";
    subfield.disabled = false;
  })
}

const createUrl = "https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2208&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQxyimjYBRdu6XxAFpMBY3EaxiZu7EsRPgy3PrV1IhXsU"

const submitForm = (event) => {
  event.preventDefault();
  event.target.disabled = true;
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
  .then(data => {
    console.log(data)
    console.log(data.estimateId);

    const link = document.createElement('a');
    link.href = `https://6317455-sb1.app.netsuite.com/app/accounting/transactions/estimate.nl?id=${data.estimateId}`;
    link.innerText = `https://6317455-sb1.app.netsuite.com/app/accounting/transactions/estimate.nl?id=${data.estimateId}`;
    link.target = "_blank";
    const div = document.createElement('div');
    div.appendChild(link);
    event.target.insertAdjacentElement('afterend', div);
  })
  .catch(error => console.error(error))
  .finally(() => {
    event.target.disabled = false
  });
}

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", submitForm);
