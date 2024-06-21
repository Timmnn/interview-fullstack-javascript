import React from 'react'

export default function TextInput({ label, value,  onChange }: {
   label: string
   value: string
   onChange: (newValue: string) => void
}) {
   return (
      <label>
         {label}
         <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
         />
      </label>
   )
}