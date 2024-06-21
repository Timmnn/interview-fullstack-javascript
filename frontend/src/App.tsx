import { useEffect, useState } from 'react'
import TextInput from './components/TextInput'
import Table from './components/Table'
import { City } from '../../types'
import AddCityForm from './components/AddCityForm'
import DeleteCityForm from './components/DeleteCityForm'
import UpdateCityForm from './components/UpdateCityForm'
import ErrorText from './components/ErrorText'


function App() {
  const [query, setQuery] = useState("Ber")
  const [apiError, setApiError] = useState(null as string | null)
  const [cities, setCities] = useState([] as City[])
  const [page, setPage] = useState(1)





  async function submitQuery(page) {
    if(!page) {
      page = 1
      setPage(1)
    }

    await fetch(`http://localhost:8000/api/v1/cities?q=${query}&page=${page}`)
      .then(response => response.json())
      .then(json => {
        setCities(json.data)

        // no more data to load
        if (json.data.length === 0) {
          setPage(Math.max(page - 1, 1))
        }

        setApiError(null)

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
    <div className='flex flex-col gap-3 p-10 '>
      <AddCityForm />
      <DeleteCityForm />
      <UpdateCityForm />
      <div className="card">
        <TextInput label="City" value={query} onChange={setQuery}/>
        <div className="flex gap-2 my-2">
          <button onClick={()=>submitQuery()}>Search</button>
          <button onClick={()=>incrementPage(-1)}>Previous</button>
          <button onClick={()=>incrementPage(1)}>Next</button>
        </div>
        <ErrorText error={apiError} />
        <Table data={cities} />

      </div>

    </div>
  )
}

export default App
