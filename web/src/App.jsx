import Header from "./components/Header";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="screen">
      <Header />
      <Card
        title="CN"
        category="CS"
        year={2023}
        price={49.99}
      />

    </div>
  );
}

export default App;
