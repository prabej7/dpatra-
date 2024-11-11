import { Route, RouteProps, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './pages';

const routes: RouteProps[] = [
  {
    path: "/register",
    element: <Register />
  }
]

function App() {

  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, element }, i) => {
          return <Route key={i} path={path} element={element} />
        })}
      </Routes>
    </div>
  );
}

export default App;
