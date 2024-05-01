// App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalStorageAdapter } from './adapters/local-storage-adapter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IncantationTable } from './components/incantation-table';
import { SorceriesTable } from './components/sorceries-table';
import { TalismanTable } from './components/talisman-table';
import { WeaponTable } from './components/weapon-table';
import { ArmorTable } from './components/armor-table';
import { AshesTable } from './components/ashes-table';
import { NavBar } from './components/nav-bar';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [db, setDb] = useState(new LocalStorageAdapter());
  const [characters, setCharacters] = useState<string[]>([]);

  const handleCharacterChange = (characterName: string) => {
    setSelectedCharacter(characterName);
  };

  useEffect(() => {
    if (selectedCharacter) {
      const newDb = new LocalStorageAdapter();
      setDb(newDb);
    }
  }, [selectedCharacter]);

  useEffect(() => {
    const characters = db.getCharacters();
    setCharacters(characters);
  }, [db]);

  return (
    <div className="App">
      <Router>
        <NavBar onCharacterChange={handleCharacterChange} characters={characters} />
        <div>
          <Routes>
            <Route path="/incantations" element={<IncantationTable db={db} />} />
            <Route path="/sorceries" element={<SorceriesTable db={db} />} />
            <Route path="/talismans" element={<TalismanTable db={db} />} />
            <Route path="/ashes-of-war" element={<AshesTable db={db} />} />
            <Route path="/weapons" element={<WeaponTable db={db} />} />
            <Route path="/armors" element={<ArmorTable db={db} />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </div>
  );
}

export default App;
