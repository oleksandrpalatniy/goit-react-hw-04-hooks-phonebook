import { useState } from 'react';
import Form from './components/phonebook/Form';
import AddPhoneList from './components/phonebook/PhoneList';
import shortid from 'shortid';
import Filter from './components/phonebook/Filter';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContacts = ({ name, number, id }) => {
    let contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const findName = contacts.find(con => con.name === contact.name);

    if (findName) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normFilter = filter.toLowerCase();
    return contacts.filter(con => con.name.toLowerCase().includes(normFilter));
  };

  return (
    <>
      <Form onSubmit={addContacts} />
      {contacts.length ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <></>
      )}
      <AddPhoneList
        data={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
