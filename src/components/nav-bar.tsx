// NavBar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageAdapter } from '../adapters/local-storage-adapter';

interface NavBarProps {
  onCharacterChange: (characterName: string) => void;
  characters: string[];
}

export function NavBar({ onCharacterChange, characters }: NavBarProps) {
  const [newCharacterName, setNewCharacterName] = useState('');
  const db = new LocalStorageAdapter();

  const handleCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCharacter = event.target.value;
    if (selectedCharacter === '__create_new__') {
      const newName = prompt('Enter the name of the new character:');
      if (newName) {
        db.saveCharacter(newName);
        setNewCharacterName(newName);
        onCharacterChange(newName);
      }
    } else {
      onCharacterChange(selectedCharacter);
      console.log("setting current character!");
      db.setCurrentDB(selectedCharacter); // Here we call setCurrentDB
    }
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <select onChange={handleCharacterChange}>
              <option value="">Select Character</option>
              {characters.map((character) => (
                <option key={character} value={character}>
                  {character}
                </option>
              ))}
              <option value="__create_new__">Create New Character</option>
            </select>
          </li>
          <li>
            <Link to="/incantations">Incantations</Link>
          </li>
          <li>
            <Link to="/sorceries">Sorceries</Link>
          </li>
          <li>
            <Link to="/talismans">Talismans</Link>
          </li>
          <li>
            <Link to="/ashes-of-war">Ashes of War</Link>
          </li>
          <li>
            <Link to="/weapons">Weapons</Link>
          </li>
          <li>
            <Link to="/armors">Armors</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
