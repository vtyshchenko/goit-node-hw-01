import { v4 } from 'uuid';
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = join(__dirname, 'db', 'contacts.json')
console.log('contactsPath', contactsPath);

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contacts[idx];
}

async function addContact(name, email, phone) {
    let contacts = await listContacts();
    const contact = {
        id: v4(),
        name,
        email,
        phone
    }

    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

async function updateContact(contactId, name, email, phone) {
    let contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    const contact = {
        id: contactId,
        name,
        email,
        phone
    }

    contacts[idx] = contact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}


export default { listContacts, getContactById, removeContact, addContact, updateContact }
