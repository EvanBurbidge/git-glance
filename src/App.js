import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";
import Router from "./Router";
import "./utils/firebase";


function App() {
  console.log('app');
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Router />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
