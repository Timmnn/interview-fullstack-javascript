import React, { useState } from 'react'
import TextInput from './TextInput'

export default function AddCityForm() {
   const [cityName, setCityName] = useState('')
   const [count, setCount] = useState('0')
   function submitCity() {
      fetch('http://localhost:8000/api/v1/cities', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            city:
               {
                  cityName: cityName,
                  count: parseInt(count),
               },
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
      <div className='card'>
         <TextInput label="City" value={cityName} onChange={setCityName} />
         <TextInput label="Count" value={count} onChange={setCount} />
         <button className='mt-2' onClick={submitCity}>Update City</button>
      </div>
   )
   
}