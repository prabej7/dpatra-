import { Route, RouteProps, Routes } from 'react-router-dom';
import './App.css';
import { Account, Citizens, Login, Register } from './pages';

const routes: RouteProps[] = [
  {
    path: "/register",
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/account",
    element: <Account />
  },
  {
    path: "/account/citizens",
    element: <Citizens />
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
