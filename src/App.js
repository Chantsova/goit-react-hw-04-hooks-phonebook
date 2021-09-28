import './App.css';
import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter.jsx';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Anastasia', number: '161-69-55' },
        { id: 'id-2', name: 'Svetlana Divnaya', number: '443-89-12' },
        { id: 'id-3', name: 'Illya Chantsov', number: '645-17-79' },
        { id: 'id-4', name: 'Tatiana Zhelezina', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const formSubmitHandler = data => {
    const found = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase(),
    );
    found === undefined
      ? setContacts(prevState => [...prevState, data])
      : alert(`${data.name} is already in the Contact List`);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <div className="wrapper">
        <section className="phonebook">
          <h1 className="phonebook__title">Phonebook</h1>
          <ContactForm onSubmit={formSubmitHandler} />
        </section>
        <section className="contacts">
          <h2 className="contacts__title">Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContacts}
          />
        </section>
      </div>
    </>
  );
}
