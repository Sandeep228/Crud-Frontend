import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import Form from "./components/Form";
import TableList from "./components/Table";
import Home from "./components/Home";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/table" element={<TableList />} />
        <Route />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
