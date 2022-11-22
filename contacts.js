const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = JSON.parse(data).find(
      ({ id }) => id === contactId.toString()
    );
    console.log(`Contact with ${contactId} is: ${contact}`);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newData = JSON.parse(data).filter(
      ({ id }) => id !== contactId.toString()
    );
    console.log(`Contact with ${contactId} successfully deleted`);
    await fs.writeFile(contactsPath, JSON.stringify(newData));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newData = JSON.parse(data);

    newData.push({ name, email, phone });

    await fs.writeFile(contactsPath, JSON.stringify(newData));
    console.log(`Contact ${name} successfully added`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
