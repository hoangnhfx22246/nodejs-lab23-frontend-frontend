import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import IndexPage from "./pages/IndexPage";
import "./App.css";
import Login from "./components/featuredUser/Login";
import PrivateRouter from "./components/privateRoute/PrivateRouter";
import PrivateLogin from "./components/privateRoute/PrivateLogin";
import Register from "./components/featuredUser/Register";
import TransactionDashboard from "./pages/transaction/TransactionDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        ),
      },
      {
        path: "login",
        element: (
          <PrivateLogin>
            <Login />
          </PrivateLogin>
        ),
      },
      {
        path: "register",
        element: (
          <PrivateLogin>
            <Register />
          </PrivateLogin>
        ),
      },
      {
        path: "/hotels",
        element: (
          <PrivateRouter>
            <List />
          </PrivateRouter>
        ),
      },
      {
        path: "hotels/:id",
        element: (
          <PrivateRouter>
            <Hotel />
          </PrivateRouter>
        ),
      },
      {
        path: "transactions",
        element: (
          <PrivateRouter>
            <TransactionDashboard />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home/>}/>
    //     <Route path="/hotels" element={<List/>}/>
    //     <Route path="/hotels/:id" element={<Hotel/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
