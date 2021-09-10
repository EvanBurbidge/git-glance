import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";
import { Header } from './components/Header';
import Router from "./Router";
import "./utils/firebase";


function App() {
  return (
    <MemoryRouter>
      <div className="App">
        <AuthProvider>
          <Header />
          <Router />
        </AuthProvider>
      </div>
    </MemoryRouter>
  );
}

export default App;
