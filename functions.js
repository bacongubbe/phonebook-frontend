function getContacts(element) {
  fetch("http://localhost:8080/contacts")
    .then((response) => response.json())
    .then((data) => {
      const contactList = createContactList(data);
      element.appendChild(contactList);
    });
}

function createContactList(contacts) {
  const contactList = document.createElement("div");
  contactList.className = "contactList";

  for (let i = 0; i < contacts.length; i++) {
    const contactDiv = document.createElement("div");
    contactDiv.className = "contactDiv";
    contactDiv.id = i; 

    contactDiv.appendChild(createContactName(contacts[i]));
    contactDiv.appendChild(createContactAddress(contacts[i]));
    contactDiv.appendChild(createContactNumber(contacts[i]));
    contactDiv.appendChild(createEditButton(i, contacts[i]));
    contactDiv.appendChild(createDeleteButton(contacts[i]))

    contactList.appendChild(contactDiv);
  }

  contactList.appendChild(createAddContactButton());

  return contactList;
}

function createContactName(contacts) {
  const contactName = document.createElement("h3");
  contactName.className = "contactName";
  contactName.textContent = `${contacts.name}`;

  return contactName;
}

function createContactAddress(contacts) {
  const contactAddress = document.createElement("h4");
  contactAddress.className = "contactAddress";
  contactAddress.textContent = "📌Address: " + `${contacts.address}`;

  return contactAddress;
}

function createContactNumber(contacts) {
  const contactNumber = document.createElement("h4");
  contactNumber.className = "contactNumber";
  contactNumber.textContent = "📞tel: " + `${contacts.phoneNumber}`;

  return contactNumber;
}

function createEditButton(div, contacts) {
  const editButton = document.createElement("button");
  editButton.className = "editButton button";
  editButton.textContent = "Edit";

  editButton.onclick = () => {editcontactField(div, contacts)};

  return editButton;
}

function createDeleteButton (contacts){
  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton button';
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {deleteContact(`${contacts.id}`)};

  return deleteButton;
}

function createAddContactButton() {
  const addContactButton = document.createElement("div");
  addContactButton.className = "addContactButton";
  
  const addPlusSign = document.createElement("h1");
  addPlusSign.textContent = "+";
  addPlusSign.id = "plusSign";
  addPlusSign.addEventListener("click", () => displayContactField());

  addContactButton.appendChild(addPlusSign);

  return addContactButton;
}

function displayContactField() {
  hidePlusSign();
  
  const addContactButton = document.querySelector(".addContactButton");

  addContactButton.appendChild(createNameInput());
  addContactButton.appendChild(createAddressInput());
  addContactButton.appendChild(createNumberInput());

  addContactButton.appendChild(createSubmitButton());
  addContactButton.appendChild(createCancelButton());
  
}

function hidePlusSign(){
  document.getElementById("plusSign").style.display = 'none';
}

function createNameInput(name){
  const createNameInput = document.createElement('input');
  createNameInput.type = 'text';
  createNameInput.className = 'input';
  createNameInput.id = 'nameInput';
  if (name == null){createNameInput.placeholder = 'Name';}
  else createNameInput.placeholder = name;

  return createNameInput;
}

function createAddressInput(address){
  const createAddressInput = document.createElement('input');
  createAddressInput.type = 'text';
  createAddressInput.className = 'input';
  createAddressInput.id = 'addressInput';
  if (address == null){createAddressInput.placeholder = 'Address';}
  else createAddressInput.placeholder = address;

  return createAddressInput;
}

function createNumberInput(phoneNumber){
  const createNumberInput = document.createElement('input');
  createNumberInput.type = 'text';
  createNumberInput.className = 'input';
  createNumberInput.id = 'numberInput';
  if (phoneNumber == null) {createNumberInput.placeholder = 'Tel: ';}
  else createNumberInput.placeholder = 'tel: '+ phoneNumber;
  

  return createNumberInput;
}

function createSubmitButton(id){
  const submitButton = document.createElement('button');
  submitButton.id = 'submitButton';
  submitButton.className = 'button';
  submitButton.textContent = 'Submit';

  submitButton.onclick = () => {submitContact(id)};

  return submitButton;
}

function createCancelButton(){
  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.textContent = 'Cancel';

  cancelButton.onclick = () => {location.reload()};

  return cancelButton;
}

function Contact(obj) {
  this.name = obj.name;
  this.address = obj.address;
  this.phoneNumber = obj.phoneNumber;
}

function submitContact(id){
    var contactName = document.getElementById("nameInput").value;
    var contactAddress = document.getElementById("addressInput").value;
    var contactNumber = document.getElementById("numberInput").value;

    var contact = new Contact({
      name: contactName,
      address: contactAddress,
      phoneNumber: contactNumber,
    });

    if(id == null) {
    fetch("http://localhost:8080/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
    .then (location.reload());}
    
    else {
      fetch("http://localhost:8080/contacts/"+id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
    .then (location.reload());
    }
};

function editcontactField(div, contacts){
  console.log("Edit!");
  hideElements(div,contacts); 
  const editContactField = document.querySelector(`[id=${CSS.escape(div)}]`);

  editContactField.appendChild(createNameInput(contacts.name));
  editContactField.appendChild(createAddressInput(contacts.address));
  editContactField.appendChild(createNumberInput(contacts.phoneNumber));

  editContactField.appendChild(createSubmitButton(contacts.id));
  editContactField.appendChild(createCancelButton());

}

function hideElements(div,contacts){
  const thisName = document.querySelector(`[id=${CSS.escape(div)}] h3.contactName`);
  const thisAddress = document.querySelector(`[id=${CSS.escape(div)}] h4.contactAddress`);
  const thisNumber = document.querySelector(`[id=${CSS.escape(div)}] h4.contactNumber`);
  
  const thisEditButton = document.querySelector(`[id=${CSS.escape(div)}] button.editButton`);
  const thisDeleteButton = document.querySelector(`[id=${CSS.escape(div)}] button.deleteButton`);

  thisName.style.display = 'none';
  thisAddress.style.display = 'none';
  thisNumber.style.display = 'none';
  thisEditButton.style.display = 'none';
  thisDeleteButton.style.display = 'none';
}

function deleteContact (id){

  fetch("http://localhost:8080/contacts/"+id, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    }
  })
  .then (location.reload());
}
