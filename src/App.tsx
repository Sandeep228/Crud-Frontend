import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import Form from "./components/Form";
import TableList from "./components/Table";
import Home from "./components/Home";
import { theme as chakraTheme } from '@chakra-ui/react';


const styles = {
  global: (props:any) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'normal', // Set wordWrap to 'normal'
    },
  }),
};

const overrides = {
  ...chakraTheme,
  styles,
};

const customTheme = extendTheme(overrides);

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      
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
