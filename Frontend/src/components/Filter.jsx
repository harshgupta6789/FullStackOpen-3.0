const Filter = (props) => {
    const handleFilterChange = (event) => {
      props.setFilter(event.target.value);
    };
    return (
      <form>
        <div>
          filter shown with
          <input value={props.filter} onChange={handleFilterChange} />
        </div>
      </form>
    );
};

export default Filter;