// index.js
// const argv = require("yargs").argv;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.js");
const contactsMethods = require(contactsPath);

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

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
      if (!name) return console.log("Need enter Contact name");
      const newContact = await contactsMethods.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contactsMethods.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
