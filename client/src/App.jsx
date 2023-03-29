import { useState, useEffect } from 'react'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';


import './App.css'



function App() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {

  }, [])


  const handleSubmit = async () => {
    console.log("button was clicked")
    console.log(input)

    const message = input;
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    if (!data.data || !data.data.choices || !data.data.choices[0].text) {
      throw new Error('Unexpected response from server!');
    }

    setOutput(data.data.choices[0].text);

  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value)


  }

  const handleClearOutput=() => {
    setOutput("");
  }

  return (
    <div className="App">
      Smart Contract Script writer
      <div className='inputDiv'>
        <textarea className='inputBox' onChange={handleChange} placeholder='Enter Your Smart Contract...' />

        <button onClick={handleSubmit} className='submit-btn'>Execute </button>
        {/* <button onClick={handleClearInput}>Clear Input</button> */}
        <button onClick={handleClearOutput}>Clear output</button>
      </div>

      <div className='responseDiv'>
        <AceEditor
        className='aceEditor'
          mode="javascript"
          theme="monokai"
          value={output}
          editorProps={{ $blockScrolling: true }}
          readOnly={true}
        />



      </div>
    </div>
  )
}

export default App


