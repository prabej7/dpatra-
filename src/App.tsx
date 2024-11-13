import { Route, RouteProps, Routes } from 'react-router-dom';
import './App.css';
import { Account, Citizens, Login, Register, Documents, Transactions, Properties } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks';
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
  },
  {
    path: "/account/documents",
    element: <Documents />
  },
  {
    path: "/account/transactions",
    element: <Transactions />
  },
  {
    path: "/account/properties",
    element: <Properties />
  }
]

function App() {
  useAuth()
  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, element }, i) => {
          return <Route key={i} path={path} element={element} />
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
