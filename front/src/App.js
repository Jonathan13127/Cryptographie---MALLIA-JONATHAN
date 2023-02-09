import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from "react";
import axios from 'axios';

function App() {

  const [keyForCrypt, setkeyCrypt] = useState("");
  const [keyForDecrypt, setkeyDecrypt] = useState("");

  const [file, setFile] = useState(null);
  const [resFile, setResFile] = useState("");

  //Pour crypter un message
  const [message, setMessage] = useState("");
  const [resHash, setResHash] = useState("");

  //Pour décrypter un message
  const [hash, setHash] = useState("");
  const [resMessage, setResMessage] = useState("");

  const [algoCrypt, setAlgoCrypt] = useState("md5");
  const [algoDecrypt, setAlgoDecrypt] = useState("aes");

  const handleAlgoCrypt = (event) => {
    setAlgoCrypt(event.target.value);
  };

  const handleAlgoDecrypt = (event) => {
    setAlgoDecrypt(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleHash = (event) => {
    setHash(event.target.value);
  };

  const handleKeyCrypt = (event) => {
    setkeyCrypt(event.target.value);
  };

  const handleKeyDecrypt = (event) => {
    setkeyDecrypt(event.target.value);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    
    var data = new FormData();
    data.append("file", file);

    console.log(data);

    const res = await axios.post('http://localhost:3000/cryptageFile',
      {
        file:file,
        algo:"sha1",
        },
      {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json ; multipart/form-data',
            Accept: 'application/json',
        },
      },
    ).then((response) => {
      return response.data;});
    
    setResFile(res);
  }

  const handleSubmitMessage =  async (e) => {
    e.preventDefault();
    

    const res = await axios.post('http://localhost:3000/cryptageMessage',
      {
        text:message,
        algo:algoCrypt,
        secretKey:keyForCrypt,
        },
      {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
      },
    ).then((response) => {
      return response.data;});

    setResHash(res);
  }


  const handleSubmitHash =  async (e) => {
    e.preventDefault();
  

    const res = await axios.post('http://localhost:3000/decryptageHash',
      {
        text:message,
        algo:algoDecrypt,
        secretKey:keyForDecrypt
        },
      {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
      },
    ).then((response) => {
      return response.data;});
    
      console.log(res);
    setResMessage(res);
  }

  return (
    <div className="App">

      <header>
        <h1>Chiffrement et déchiffrement de texte -- MALLLIA Jonathan</h1>
        </header>
      
      <div className='container'>
        <div className='Formulaire'>
          <h2>Chiffrement de texte</h2>
          <form onSubmit={handleSubmitMessage}>
            <input type="text" placeholder='Message' value={message} onChange={handleMessage} />
            <input type="text" placeholder='KEY' value={keyForCrypt} onChange={handleKeyCrypt} />
            <select onChange={handleAlgoCrypt}>
                <option >md5</option>
                <option >sha256</option>
                <option >aes</option>
                <option >rsa</option>
                <option >keccak512</option>
                <option >ripeMD160</option>
             </select>
            <button type="submit">Chiffrer</button>
          </form>

          <div id="hash">
                {resHash && 
                    <p style={{margin:"10px",padding:"0px",color:"green"}}>
                    {resHash}
                    </p>
                }
          </div>
        </div>

        <div className='Formulaire'>

          <h2>Déchiffrement de text</h2>
            <form onSubmit={handleSubmitHash}>
              <input type="text" placeholder='Hash' value={hash} onChange={handleHash} />
              <input type="text" placeholder='KEY' value={keyForDecrypt} onChange={handleKeyDecrypt} />
              <select onChange={handleAlgoDecrypt}>
                <option value="aes">aes</option>
                <option value="rsa">rsa</option>
              </select>
              <button type="submit">Déchiffrer</button>
            </form>

            <div id="msg">
                  {resMessage && 
                      <p style={{margin:"10px",padding:"0px",color:"green"}}>
                      {resMessage}
                      </p>
                  }
            </div>

          {/* <form onSubmit={handleSubmitFile}>
            <input type="text" onChange={handleFileChange} draggable/>
            <button type="submit">Upload</button>
          </form>

          <div id="msg">
                {resFile && 
                    <p style={{margin:"10px",padding:"0px",color:"green"}}>
                    {resFile}
                    </p>
                }
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;