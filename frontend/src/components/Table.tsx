import { City } from '../../../types'

export default function Table({ data }: {data: City[]}) {
   // e.g. data = [{uuid: "1", cityName: "Butzbach", count: 1}, {uuid: "2", cityName: "Berlin", count: 2}]
   // e.g. columns = ["uuid", "cityName", "count"]
   const columns: (keyof City)[] = data[0] ? Object.keys(data[0]) as (keyof City)[] : []


      return (
         <table className='outline outline-1'>
               <thead>
                  <tr className='bg-blue-400 text-center'>
                     {columns.map((col) => (
                        <th key={col}>{col}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((city) => (
                     <tr key={city.id} className='odd:bg-blue-200 even:bg-blue-300'>
                        {columns.map((col) => (
                           <td  className='text-center' key={city.id + col}>{ city[col] }  </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
         </table>
      )
}