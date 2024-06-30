function ListGroup() {
  let list = ["apple", "banana", "cherry"];
//   list = [];

  if (list.length === 0) {
    return <h1> No values in list</h1>;
  }

  return (
    <>
      <h1>List Group</h1>

      <ul className="list-group">
        {list.map((item) => (
          <li> {item}</li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
