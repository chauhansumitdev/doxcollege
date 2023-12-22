import Navigation from "./components/Navigation";
import AppRoutes from '../src/router/routesConfig';


const App = () => {
  return (
    <div className="screen">
      <Navigation />
      <AppRoutes />
    </div>
  );
}

export default App;
