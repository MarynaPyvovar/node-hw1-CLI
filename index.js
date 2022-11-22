const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts();
      console.table(data);
      break;

    case "get":
      await getContactById(id);
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
