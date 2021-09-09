import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";
import Router from "./Router";
import "./utils/firebase";


function App() {
  console.log('app loading')
  return (
    <MemoryRouter>
      <AuthProvider>
        <div className="App border-2 border-primary">
          <Router />
        </div>
      </AuthProvider>
    </MemoryRouter>
  );
}

export default App;
