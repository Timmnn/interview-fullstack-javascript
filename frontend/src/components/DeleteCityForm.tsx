import React, { useState } from 'react'
import TextInput from './TextInput'

export default function AddCityForm() {
   const [cityName, setCityName] = useState('')
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
         })
         .catch(err => {
            console.error(err);
         });
      }

      
   return (
      <div>
         <TextInput label="City" value={cityName} onChange={setCityName} />
         <button onClick={deleteCity}>Delete City</button>
      </div>
   )
   
}