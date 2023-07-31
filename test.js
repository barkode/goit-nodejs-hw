const fs = require("fs/promises");
const path = require("path");
const argv = require("yargs").argv;
const { nanoid } = require("nanoid");

const contactsPath1 = path.join(__dirname, "contacts.json");
console.log(contactsPath1);
const contactsPath = path.join(__dirname, "db/contacts_test.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  // console.table(JSON.parse(data));
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  // console.log(result ?? null);
  return result ?? null;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  // console.table(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    // console.log(null);
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

// listContacts()
// getContactById("qdggE76Jtbfd9eWJHrssH1");
// addContact("Helen Jons", "wfww@ww.wws", "(987) 297-9654");
// removeContact("UauCiDc42FynNn-jSPIsW");
console.log(argv);

const actionIndex = argv.action;

console.log(actionIndex);
