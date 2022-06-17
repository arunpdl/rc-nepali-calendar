import Calendar from "./components/Calendar";

const App = () => {
  return <Calendar onChange={(date, npDate) => console.log(date, npDate)} />;
};

export default App;
