import { useState } from "react";
import phoneBookService from "../services/phoneBook";

const PersonForm = (props) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    let person = props.persons.find((p) => p.name === newName);
    if (person !== undefined) {
      // alert(`${newName} is already added to the phonebook`);
      person.number = newNumber;
      phoneBookService.updatePhone(person).then((response) => {
        props.setPersons(
          props.persons.map((p) => (p.name === response.name ? response : p))
        );
        props.setErrorMessage(`Updated ${response.name}`);
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          props.setErrorMessage(null);
        }, 5000);
      });
    } else {
      const newPhone = {
        name: newName,
        number: newNumber,
      };
      phoneBookService.addNew(newPhone).then((response) => {
        props.setPersons(props.persons.concat(response));
        setNewName("");
        setNewNumber("");
        props.setErrorMessage(`Updated ${response.name}`);
        setTimeout(() => {
          props.setErrorMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <form>
      <h2>add a new</h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
