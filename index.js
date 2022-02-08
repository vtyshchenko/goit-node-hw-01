const {program} = require('commander');

const contactsList = require("./contacts");

program
  .option('-a --action <type>', 'Programm operation')
  .option('-i --id <type>', 'Contact id')
  .option('-n --name <type>', 'Contact name')
  .option('-e --email <type>', 'Contact email')
  .option('-p --phone <type>', 'Contact phone')

program.parse(process.argv);
const options = program.opts();

invokeAction(options);




async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsList.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsList.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      console.table(contact);
      break;

    case 'add':
      const addedContact = await contactsList.addContact(name, email, phone);
      console.table(addedContact);
      break;

    case 'remove':
      const removedContact = await contactsList.removeContact(id);
      if (!removedContact) {
        return
      }
      console.table(removedContact);
      break;

    case 'update':
      const updatedContact = await contactsList.updateContact(id, name, email, phone);

      if (!updatedContact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      console.table(updatedContact);
      break;

    default:
      const option = [
        { key: '-a --action [list || get|| add || remove || update]', name: 'Programm operation' },
        { key: '-i --id <value>', name: 'Contact id' },
        { key: '-n --name <value>', name: 'Contact name' },
        { key: '-e --email <value>', name: 'Contact email' },
        { key: '-p --phone <value>', name: 'Contact phone' },
      ];
      console.table(option);
      console.warn('\x1B[31m Unknown action type!');
  }
}
