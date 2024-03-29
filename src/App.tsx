import { useState } from 'react';
import './App.css';
import { IncantationTable } from './components/incantation-table';
import { SorceriesTable } from './components/sorceries-table';
import { BrowserRouter as Router, Routes,  Route, Link } from 'react-router-dom';
import { LocalStorageAdapter } from './adapters/local-storage-adapter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TalismanTable } from './components/talisman-table';


function App() {
  const db = new LocalStorageAdapter();

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
            <li>
              <Link to="/talismans">Talismans</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
       
        <Routes>
          <Route path="/incantations" element={<IncantationTable db={db} />} />
          <Route path="/sorceries" element={<SorceriesTable db={db} />} />
          <Route path="/talismans" element={<TalismanTable db={db} />} />
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
    </div>
  );
}

export default App;
