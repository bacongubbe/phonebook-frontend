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

      contactList.appendChild(contactDiv);
    }

    return contactList;
  }

  function createContactName(contacts) {
    const contactName = document.createElement("h3");
    contactName.className = "contactName";
    contactName.textContent = `${contacts.name}`;

    return contactName;
  }

  function createContactAddress(contacts){
    const contactAddress = document.createElement('h4');
    contactAddress.className = "contactAddress";
    contactAddress.textContent = `${contacts.address}`;

    return contactAddress;
  }

  function createContactNumber(contacts){
    const contactNumber = document.createElement('h4');
    contactNumber.className = "contactNumber";
    contactNumber.textContent = `${contacts.phoneNumber}`;

    return contactNumber;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.querySelector("main");
    getContacts(mainElement);
  });