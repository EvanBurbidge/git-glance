import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ApolloLocalProvider } from "./context/apolloContext";
import { AuthProvider } from "./context/loginContext";
import Router from "./Router";
import "./utils/firebase";


function App() {
  return (
    <MemoryRouter>
      <div className="App border rounded-sm border-primary">
        <AuthProvider>
          <ApolloLocalProvider>
            <Router />
          </ApolloLocalProvider>
        </AuthProvider>
      </div>
    </MemoryRouter>
  );
}

export default App;
