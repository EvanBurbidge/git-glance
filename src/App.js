import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";
import Router from "./Router";
import "./utils/firebase";


function App() {
  console.log('app');
  return (
    <BrowserRouter>
    <AuthProvider>
        <div className="App">
          <Router />
        </div>
    </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
