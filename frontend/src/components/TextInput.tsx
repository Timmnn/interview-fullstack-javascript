
export default function TextInput({ label, value,  onChange }: {
   label: string
   value: string
   onChange: (newValue: string) => void
}) {
   return (
      <label className='flex flex-col gap-2'>
         {label}
         <input
            type="text"
            className='border border-gray-400 p-1 rounded'
            value={value}
            onChange={e => onChange(e.target.value)}
         />
      </label>
   )
}