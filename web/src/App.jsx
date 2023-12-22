import Header from "./components/Header";
import AppRoutes from '../src/router/routesConfig';


const App = () => {
  return (
    <div className="screen">
      <Header />
      <AppRoutes/>
    </div>
  );
}

export default App;
