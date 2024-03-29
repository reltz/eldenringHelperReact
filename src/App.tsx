import './App.css';
import { IncantationTable } from './components/incantation-table';
import { SorceriesTable } from './components/sorceries-table';
import { BrowserRouter as Router, Routes,  Route, Link } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      {/* <IncantationTable /> */}
      <Router>
      <div className="navbar"> {/* Add the navbar class */}
        <nav>
          <ul>
            <li>
              <Link to="/incantations">Incantations</Link>
            </li>
            <li>
              <Link to="/sorceries">Sorceries</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/incantations" element={<IncantationTable />} />
          <Route path="/sorceries" element={<SorceriesTable />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
