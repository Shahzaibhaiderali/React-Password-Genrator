import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {FaCopy} from 'react-icons/fa';
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(5);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [length, numbers, symbols, uppercase, lowercase]);

  useEffect(() => {
    copyToClipboard();
  }, [password]);

  function includeNumbers(e) {
    setNumbers(e.target.checked);
  }

  function includeSymbols(e) {
    setSymbols(e.target.checked);
  }

  function includeUppercase(e) {
    setUppercase(e.target.checked);
  }

  function includeLowercase(e) {
    setLowercase(e.target.checked);
  }

  function generatePassword() {
    let charSet = 'EnterPassword';
    let generatedPassword = '';

    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
    const numbersCharset = '0123456789';
    const symbolsCharset = '!@#$%^&*()';

    if (uppercase) {
      charSet += uppercaseCharset;
    }

    if (lowercase) {
      charSet += lowercaseCharset;
    }

    if (numbers) {
      charSet += numbersCharset;
    }

    if (symbols) {
      charSet += symbolsCharset;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password)
      .then(() => {
        console.log('Password copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard: ', error);
      });
  }

  return (
    <div className="card-container">
      <h2>PASSWORD GENRATOR</h2>
      <div className="card">
        <h3>{password}</h3><button onClick={copyToClipboard}>Copy <FaCopy /></button>
        <label htmlFor="length">Length: {length}</label>
        <input
          type="range"
          min="5"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <br />
        <label htmlFor="numbers">Include Numbers</label>
        <input
          type="checkbox"
          checked={numbers}
          onChange={includeNumbers}
        />
        <br />
        <label htmlFor="symbols">Include Symbols</label>
        <input
          type="checkbox"
          checked={symbols}
          onChange={includeSymbols}
        />
        <br />
        <label htmlFor="uppercase">Include Uppercase</label>
        <input
          type="checkbox"
          checked={uppercase}
          onChange={includeUppercase}
        />
        <br />
        <label htmlFor="lowercase">Include Lowercase</label>
        <input
          type="checkbox"
          checked={lowercase}
          onChange={includeLowercase}
        />
        <br />
      </div>
    </div>
  );
  }
export default App;


