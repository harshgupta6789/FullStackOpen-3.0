import phoneBookService from "../services/phoneBook";

const PhonebookList = ({ persons, filter, setPersons, setErrorMessage }) => {
  const deletePhone = (id) => {
    const name = persons.find((p) => p.id === id).name;
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      phoneBookService
        .deletePhone(id)
        .then((response) => {
          console.log("inside PhoneBookList", response);
          setPersons(persons.filter((p) => p.id !== id));
          setErrorMessage(`${name} successfully deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((e) => {
          setErrorMessage(`${name} already deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((p) =>
            filter.length >= 3
              ? p.name.toLowerCase().includes(filter.toLowerCase())
              : true
          )
          .map((p) => (
            <li className="phoneBook" key={p.id}>
              {p.name} {p.number}{" "}
              <button onClick={() => deletePhone(p.id)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PhonebookList;
