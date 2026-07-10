import React from 'react'
import { useState } from 'react'

const App = () => {

  const [tittle, setTittle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])

  const submitHandler = (e)=>{
    e.preventDefault()

    const copyTask = [...task]
    copyTask.push({tittle,details})
    setTask(copyTask)

    console.log(copyTask)

    setTittle('')
    setDetails('')
  }

  const deleteNote = (idx)=>{
    const copyTask = [...task]

    copyTask.splice(idx,1)
    setTask(copyTask)
  }


  return (
    <div className='h-screen lg:flex bg-black text-white'>
      <form
      onSubmit={(e)=>{submitHandler(e)}} 
      className='lg:w-1/2 flex items-start flex-col gap-4 p-10'>

        <h1 className='text-3xl font-bold'>Add notes:</h1>

        <input 
              type="text" 
              placeholder='Heading' 
              className='px-5 py-2 w-full font-medium border-2 outline-none rounded'
              value={tittle}
              onChange={(e)=>{setTittle(e.target.value)}}
        />

        <textarea 
                 name="" 
                 id="" 
                 type="text" 
                 placeholder='Write details-'
                 className='px-5 py-2 w-full font-medium border-2 outline-none rounded'
                 value={details}
                 onChange={(e)=>{setDetails(e.target.value)}}
        />

        <button className='w-full active:scale-95 bg-white text-black font-medium px-5 py2 rounded outline-none'>Add Note</button>

      </form>
      <div className='lg:w-1/2 bg-black p-10'>
        <h1 className='text-3xl font-bold'>Recent notes:</h1>
        <div className='flex flex-wrap items-start justify-start gap-5 mt-5 overflow-auto h-full'>
          {task.map(function(elem,idx){
          return <div key={idx} className='flex justify-between flex-col items-start relative h-52 w-40  rounded-2xl p-4 text-black bg-white'>
            <div>
            <h3 className='leading-tight text-xl font-bold'>{elem.tittle}</h3>
            <p className='mt-4 leading-tight font-medium'>{elem.details}</p>
            </div>
            <button onClick={()=>{
              deleteNote(idx)
            }} className='w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white'>Delete</button>
          </div>
          })}
        </div>
      </div>
  
    </div>
  )
}

export default App