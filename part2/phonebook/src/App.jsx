import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Components/Header";
import Input from "./Components/Input";
import Directory from "./Components/Directory";
import PhonebookForm from "./components/PhonebookForm";
import Notification from "./components/Notification";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const setNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const personExists = persons
      .map((person) =>
        JSON.stringify({
          name: person.name,
          number: person.number,
        }),
      )
      .includes(JSON.stringify(newPerson));

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const existingPerson = persons.find((person) => person.name === newName);
      if (existingPerson) {
        if (
          window.confirm(
            `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`,
          )
        ) {
          personsService
            .update(existingPerson.id, newPerson)
            .then((returnedPerson) => {
              console.log(returnedPerson);
              setPersons(
                persons.map((person) =>
                  person.id === existingPerson.id ? returnedPerson : person,
                ),
              );
              setNotification(
                "success",
                `Updated ${returnedPerson.name}'s number`,
              );
            })
            .catch((err) => {
              setNotification("error", err.response.data.error);
            });
        }
      } else {
        personsService
          .create(newPerson)
          .then((person) => {
            setPersons(persons.concat(person));
            setNotification("success", `Added ${person.name}`);
          })
          .catch((err) => {
            setNotification("error", err.response.data.error);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleInput = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then((removedPerson) => {
          setPersons(
            persons.filter(
              (currentPerson) => removedPerson.id !== currentPerson.id,
            ),
          );
          setNotification(
            "success",
            `Removed ${removedPerson.name} from the server`,
          );
        })
        .catch((err) => {
          setPersons(
            persons.filter((currentPerson) => currentPerson.id !== person.id),
          );
          setNotification(
            "error",
            `${person.name}'s information has already been removed from the server`,
          );
        });
    }
  };

  return (
    <div>
      <Header header="Phonebook" />
      <Notification type={notificationType} message={notificationMessage} />
      <Input
        text="filter shown with"
        value={filter}
        handleInput={(event) => handleInput(event, setFilter)}
      />
      <Header header="add a new" />
      <PhonebookForm
        handleSubmit={addNumber}
        handleInput={handleInput}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <Header header="Numbers" />
      <Directory
        persons={persons}
        filter={filter}
        onDeleteListing={handleDelete}
      />
    </div>
  );
};

export default App;
