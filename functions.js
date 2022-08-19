function getContacts(element) {
    fetch("http://localhost:8080/contacts", {
        mode: 'no-cors'
    })
        .then((response) => response.json())
        .then((data) => {
            const contactList = createContactList(data);
            element.appendChild(contactList);
        });
}

function createContactList(contacts) {
    const contactList = document.createElement('div');

    for (let i = 0; i < contacts.length; i++) {
        const contactDiv = document.createElement('div');
        contactDiv.className = "contact";

        contactDiv.appendChild(createContactName(contacts[i]));
        contactDiv.appendChild();
        contactDiv.appendChild();

    }
}

function createContactName (contact){
    const contactName = document.createElement('h3');
    contactName.textContent = `${contact.name}`;

    return contactName;
}

