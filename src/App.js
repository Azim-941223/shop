import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from './components/Sidebar/Sidebar';
import { getCategories } from "./features/categories/categoriesSlice";
import { getProducts } from "./features/products/productsSlice";

import UserForm from "./components/User/UserForm";

/**
 * The main application component.
 * It serves as the entry point of the application and renders the main layout.
 *
 * @returns {JSX.Element} - The JSX representation of the application.
 */
const App = () => {
  const dispatch = useDispatch();

  /**
   * Fetches categories and products data when the component mounts.
   * It uses the dispatch function to trigger the respective actions to fetch the data.
   */
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  /**
   * Renders the application layout including the header, user form, sidebar, main content, and footer.
   *
   * @returns {JSX.Element} - The JSX representation of the application layout.
   */
  return (
    <div className="app">
      <Header /> {/* Renders the application header */}
      <UserForm /> {/* Renders the user form (signup/login) */}
      <div className="container">
        <Sidebar /> {/* Renders the sidebar navigation */}
        <AppRoutes /> {/* Renders the main content based on the current route */}
      </div>
      <Footer /> {/* Renders the application footer */}
    </div>
  );
};

export default App;
