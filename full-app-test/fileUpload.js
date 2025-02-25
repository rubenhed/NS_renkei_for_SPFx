const fileInput = document.querySelector("#file-upload");

let base64data;

const updateFileDisplay = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      base64data = reader.result.split('base64,')[1];; // Base64 string (data URL format)
      //preview.textContent = `Selected file: ${base64data}`;
      //console.log(base64data);
      fileInput.dataset.binary = base64data;
    };
  }
}

fileInput.addEventListener("change", updateFileDisplay);