import { City } from '../../../types'

export default function Table({ data }: {data: City[]}) {
   // e.g. data = [{uuid: "1", cityName: "Butzbach", count: 1}, {uuid: "2", cityName: "Berlin", count: 2}]
   // e.g. columns = ["uuid", "cityName", "count"]
   const columns: (keyof City)[] = data[0] ? Object.keys(data[0]) as (keyof City)[] : []


      return (
         <table>
               <thead>
                  <tr>
                     {columns.map((col) => (
                        <th key={col}>{col}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((city) => (
                     <tr key={city.id}>
                        
                        {columns.map((col) => (
                           <td key={city.id + col}>{ city[col] }  </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
         </table>
      )
}