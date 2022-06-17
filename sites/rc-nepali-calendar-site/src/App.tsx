import { Calendar } from "rc-nepali-calendar";

function App() {
  return (
    <div className="App">
      <Calendar onChange={(ad, bs) => console.log({ ad, bs })} />
    </div>
  );
}

export default App;
