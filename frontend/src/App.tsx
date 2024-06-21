import { useEffect, useState } from 'react'
import './App.css'
import TextInput from './components/TextInput'
import Table from './components/Table'
import { City } from '../../types'
import AddCityForm from './components/AddCityForm'

function App() {
  const [query, setQuery] = useState("Ber")
  const [apiError, setApiError] = useState(null as string | null)
  const [cities, setCities] = useState([] as City[])
  const [page, setPage] = useState(1)





  async function submitQuery(page = 1) {
    await fetch(`http://localhost:8000/api/v1/cities?q=${query}&page=${page}`)
      .then(response => response.json())
      .then(json => {
        setCities(json.data)

        // no more data to load
        if (json.data.length === 0) {
          setPage(page - 1)
        }

      })
      .catch(err=> {
        console.error(err)
        setApiError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      })
  }

  useEffect(() => {
    submitQuery(page)
  }, [page])

  function incrementPage(diff: number) {
    const newPage = page + diff
    if (newPage < 1) {
      return
    }
    setPage(newPage)
  }




  return (
    <>
      <AddCityForm />
      <TextInput label="City" value={query} onChange={setQuery}/>
      <button onClick={()=>submitQuery()}>Search</button>
      <button onClick={()=>incrementPage(-1)}>Previous</button>
      <button onClick={()=>incrementPage(1)}>Next</button>
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
