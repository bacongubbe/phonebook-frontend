function getContacts(element) {
    fetch ("http://localhost:8080/contacts")
        .then ((response) => response.json)
        .then ((data) => {
            const contactList = createContactList(data.results);
            element.appendChild(contactList);
        })
}

function createContactList(contacts) {
    const contactList = document.createElement("div");

    for (let i = 0; contacts.length < i; i++) {
        const contactDiv = document.createElement("div");
        contactDiv.className = "contact";

        
    }
}