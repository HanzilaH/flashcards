import './App.css';
import Home from './pages/Home';
import { DataContextProvider } from './DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjectstore from './components/Subjectstore';
import Flash from './pages/Flash';
import Subjectview from './components/Subjectview';
import QuestionStore from './components/QuestionStore';
import Subjectflash from './components/Subjectflash';
import { useState } from 'react';
import Subjectlist from './components/Subjectlist';

function App() {

  const [subjectView, setSubjectView] = useState(true)
  const [questionJSON, setQuestionJSON] = useState({question:"", answer:""})


  const handleQuestionClick=(e)=>{
    setSubjectView(!subjectView);
    console.log(e);
    setQuestionJSON(e)
  }

  return (

    <div className="App">

      <DataContextProvider>
        {
          subjectView? <Subjectview onQuestionClick={handleQuestionClick} />: <QuestionStore questionJSON = {questionJSON}  onDoneClick={handleQuestionClick}></QuestionStore>
        }

        <Subjectflash></Subjectflash>
        <Subjectlist></Subjectlist>
        

        {/* <Subjectstore></Subjectstore> */}

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
