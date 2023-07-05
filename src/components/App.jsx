import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    setContacts([...contacts, { ...data, id: nanoid() }]);
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div
      style={{
        width: '300px',
        padding: '15px',
        margin: 'auto',
        alignContent: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {getFilteredContacts().length > 0 && (
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};
