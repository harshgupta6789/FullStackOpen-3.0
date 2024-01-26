import { useState, useEffect } from "react";
import PhonebookList from "./components/PhonebookList";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneBookService from "./services/phoneBook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  useEffect(() => {
    phoneBookService.getAll().then((initialList) => setPersons(initialList));
  }, []);

  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      ></PersonForm>
      <PhonebookList
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      ></PhonebookList>
    </div>
  );
};

export default App;
