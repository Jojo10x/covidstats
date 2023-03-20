import {Routes, Route} from 'react-router-dom';
import CountriesList from "./CountriesList";
import CountryDetails from "./CountryDetails";

function App() {


  return (<>
      <Routes>
      <Route path="/country" element={<CountryDetails />} />
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
   
    </>
  );
}

export default App;