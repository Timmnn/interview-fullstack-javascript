import  { useState } from 'react'
import TextInput from './TextInput'
import ErrorText from './ErrorText'

export default function AddCityForm() {
   const [cityName, setCityName] = useState('')
   const [apiError, setApiError] = useState('')

   function deleteCity() {
      fetch('http://localhost:8000/api/v1/cities', {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            cityName: cityName,
         }),
      })
         .then(response => response.json())
         .then(json => {
            console.log(json);
            setApiError('');
         })
         .catch(err => {
            console.error(err);
            setApiError(err.toString());
         });
      }

      
   return (
      <div className='card'>
         <TextInput label="City" value={cityName} onChange={setCityName} />
         <button className='mt-2' onClick={deleteCity}>Delete City</button>
         <ErrorText error={apiError} />
      </div>
   )
   
}