import { useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import Table from './components/Table'
import { City } from '../../types'

function App() {
  const [query, setQuery] = useState("Butzbach")
  const [apiError, setApiError] = useState(null as string | null)
  const [cities, setCities] = useState([] as City[])



  function submitQuery() {
    console.log("submitting query")
    fetch(`http://localhost:8000/api/v1/cities?q=${query}`)
      .then(response => response.json())
      .then(json => {
        console.log("Got data", json)

        setCities(json.data)

      })
      .catch(err=> {
        console.error(err)
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

      <Table data={cities} />
    </>
  )
}

export default App
