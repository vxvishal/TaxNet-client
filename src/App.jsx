import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Navbar from './pages/Navbar/Navbar';
import Home from './pages/Home/Home';
import Sales from './pages/Sales/Sales';
import SalesMonth from './pages/SalesMonth/SalesMonth'; // Import the new component
import Purchase from './pages/Purchase/Purchase';
import Error from './pages/Error/Error';
import AddSale from './pages/AddSale/AddSale';
import ViewSales from './pages/ViewSales/ViewSales';
import PurchaseMonth from './pages/PurchaseMonth/PurchaseMonth';
import AddPurchase from './pages/AddPurchase/AddPurchase';
import ViewPurchases from './pages/ViewPurchases/ViewPurchases';

function App() {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "sales",
          element: <Sales />,
          children: [ // Add children to the sales route
            {
              path: ":monthYear", // Add a dynamic route
              element: <SalesMonth />, // Use the new component
              children: [
                {
                  path: "add",
                  element: <AddSale />,
                },
                {
                  path: "view",
                  element: <ViewSales />,
                },
              ],
            },
          ],
        },
        {
          path: "purchase",
          element: <Purchase />,
          children: [ // Add children to the sales route
            {
              path: ":monthYear", // Add a dynamic route
              element: <PurchaseMonth />, // Use the new component
              children: [
                {
                  path: "add",
                  element: <AddPurchase />,
                },
                {
                  path: "view",
                  element: <ViewPurchases />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;