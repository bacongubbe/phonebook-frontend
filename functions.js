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

    contactDiv.appendChild(createContactName(contacts[i]));
    contactDiv.appendChild(createContactAddress(contacts[i]));
    contactDiv.appendChild(createContactNumber(contacts[i]));
    contactDiv.appendChild(createEditButton(contacts[i]));
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

function createEditButton(contacts) {
  const editButton = document.createElement("button");
  editButton.className = "editButton button";
  editButton.textContent = "Edit";

  return editButton;
}

function createDeleteButton (contacts){
  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton button';
  deleteButton.id = `${contacts.id}`;
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {deleteContact(deleteButton.id)};

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
  console.log("clickityclick");
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

function createNameInput(){
  const createNameInput = document.createElement('input');
  createNameInput.type = 'text';
  createNameInput.className = 'input';
  createNameInput.id = 'nameInput';
  createNameInput.placeholder = 'Name';

  return createNameInput;
}

function createAddressInput(){
  const createAddressInput = document.createElement('input');
  createAddressInput.type = 'text';
  createAddressInput.className = 'input';
  createAddressInput.id = 'addressInput';
  createAddressInput.placeholder = 'Address';

  return createAddressInput;
}

function createNumberInput(){
  const createNumberInput = document.createElement('input');
  createNumberInput.type = 'text';
  createNumberInput.className = 'input';
  createNumberInput.id = 'numberInput';
  createNumberInput.placeholder = 'Tel: ';

  return createNumberInput;
}

function createSubmitButton(){
  const submitButton = document.createElement('button');
  submitButton.id = 'submitButton';
  submitButton.className = 'button';
  submitButton.textContent = 'Submit';

  submitButton.onclick = () => {submitContact()};

  return submitButton;
}

function createCancelButton(){
  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancelButton';
  cancelButton.className = 'button';
  cancelButton.textContent = 'Cancel';

  return cancelButton;
}

function Contact(obj) {
  this.name = obj.name;
  this.address = obj.address;
  this.phoneNumber = obj.phoneNumber;
}

function submitContact(){
    var contactName = document.getElementById("nameInput").value;
    var contactAddress = document.getElementById("addressInput").value;
    var contactNumber = document.getElementById("numberInput").value;

    var contact = new Contact({
      name: contactName,
      address: contactAddress,
      phoneNumber: contactNumber,
    });

    console.log(contact);

    fetch("http://localhost:8080/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    location.reload();
};

function deleteContact (id){
  fetch("http://localhost:8080/contacts/"+id, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    }
  });

  location.reload();
}
