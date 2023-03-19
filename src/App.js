import "./css/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CountriesList from "./CountriesList";
import CountryDetails from "./CountryDetails";

function App() {

  const location = useLocation();
  return (<>
     
  
    
     {location.state}
      <Routes>
      <Route path="/country" element={<CountryDetails />} />
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
   
    </>
  );
}

export default App;