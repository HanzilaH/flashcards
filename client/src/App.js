import './App.css';
import Home from './pages/Home';
import { DataContextProvider } from './DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjectstore from './components/Subjectstore';
import Flash from './pages/Flash';

function App() {

  return (

    <div className="App">

      <DataContextProvider>
        <Home></Home>
        {/* <Subjectstore >

        </Subjectstore> */}

      {/* <Router>


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flash" element={<Flash />} />
            
          </Routes>

      </Router> */}
        
      </DataContextProvider>
      
      
    </div>
  );
}

export default App;
