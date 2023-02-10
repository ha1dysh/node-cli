const fs = require('fs').promises;

const contactsPath = './db/contacts.json';

function listContacts() {
  try {
    fs.readFile(contactsPath).then((d) => console.table(JSON.parse(d)));
  } catch (error) {
    console.log(`Something wrong: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data).find((e) => e.id === contactId + ''));
    console.table(contact);
  } catch (error) {
    console.log(`Something wrong: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath).then((data) =>
      JSON.parse(data)
        .filter((e) => {
          return e.id !== contactId;
        })
        .map((e, i) => ({ ...e, id: i + 1 }))
    );

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(`Something wrong: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      console.log('returned');
      return;
    }

    const contacts = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data));

    contacts.push({ id: String(contacts.length + 1), name, email, phone });

    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(`Something wrong: ${error}`);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
