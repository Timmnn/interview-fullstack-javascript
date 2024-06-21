import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput.tsx'

function App() {
  const [query, setQuery] = useState("Butzbach")
  const [apiError, setApiError] = useState(null as string | null)



  function submitQuery() {
    console.log("submitting query")
    fetch(`http://localhost:8000/city?q=${query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        setApiError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      })
  }

  return (
    <>
      <TextInput label="City" value={query} onChange={setQuery}/>
      <button onClick={submitQuery}>Search</button>
      <p>
        {apiError && (
          apiError
        )}
      </p>
    </>
  )
}

export default App
