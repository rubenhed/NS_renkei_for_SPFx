
//https://cors-anywhere.herokuapp.com/corsdemo to enable heroku cors link
//newurl = https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2207&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQDyczeSzE3X8pdZFFc6zNC6W8GSq3Pq2pyTP87SioWes

const suiteqlUrl = "https://cors-anywhere.herokuapp.com/https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2210&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQVhNErAxA2RTx8ktjnsORgOoqu5T5GDRS7u-hhQFJ130"
const searchFields = document.querySelectorAll(".search-field")


const submitData = {
  estimate: {
    customerId: null,
    departmentId: null,
    locationId: null,
    classificationId: null,
    items: []
  },
  file: {
    contents: null,
    encoding: "UTF-8",
    folderID: 20757,
    isOnline: true,
    description: "test file for now",
    fileType: "PDF",
    name: "testfile.pdf"
  }
}


const subsidiary = 7; //6 is GIKK, 7 is GMKK

searchFields.forEach(searchField => {
  searchField.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const type = event.target.id;

    
    console.log("input:", event.target.value);
    const params = [`%${event.target.value}%`];
    //const params = [`7`];
    const resultList = searchField.nextElementSibling;
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
      const field = type === "customer" ? "altname" : "name";
      data.forEach(result => {
        if (result.subsidiary && result.subsidiary != subsidiary) {
          return;
        }
        const li = document.createElement('li');
        li.textContent = result[field];
        li.style.cursor = 'pointer';
        resultList.appendChild(li);
        li.addEventListener('click', () => {
          event.target.value = result[field];
          submitData.estimate[type] = result.id;
          resultList.innerHTML = "";
          console.log(submitData);
        });
      });
    })
  })
});

