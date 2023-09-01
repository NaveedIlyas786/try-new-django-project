import './App.css'
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage'
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {

  return (
    <Router>
      <Navbar/>
     <Routes>
      <Route path='/' index element={<Homepage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
     </Routes>
    </Router>
  )
}

export default App
