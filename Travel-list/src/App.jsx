import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  function HandleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((Items) => items.filter((item) => item.id !== id));
  }

  function HandleToggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function Handleclearlist() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={HandleAddItems} />
      <PackingList
        items={items}
        onDeleteitem={handleDeleteItems}
        onToggleItem={HandleToggleitem}
        onClearitems={Handleclearlist}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🏖️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function Handlesubmit(e) {
    e.preventDefault();
    console.log(e);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={Handlesubmit}>
      <h3>What do you need for your ✈️trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((nums) => (
          <option value={nums} key={nums}>
            {nums}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteitem, onToggleItem, onClearitems }) {
  const [sortby, SetSortBy] = useState("input");

  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteitem={onDeleteitem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortby} onChange={(e) => SetSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description"> Sort by description</option>
          <option value="packed"> Sort by packed items</option>
        </select>
        <button onClick={onClearitems}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteitem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteitem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numitems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numitems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you have everthing ! Ready to go "
          : `👜You have ${numitems} items in your list , and you alredy packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
