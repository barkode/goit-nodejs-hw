// index.js
const argv = require("yargs").argv;

const contactsMethods = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsMethods.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contactsMethods.getContactById(id);
      console.table(oneContact);
      break;

    case "add":
      const newContact = await contactsMethods.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsMethods.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
