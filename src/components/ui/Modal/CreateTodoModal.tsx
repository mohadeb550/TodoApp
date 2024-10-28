/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen, FaListAlt } from 'react-icons/fa';
import { useCreateTodoMutation } from "../../../redux/features/todo/todoApi";


// type for todo
export type TTodo = {
    _id? : string,
    title : string,
    deadline : string,
    priority : string
    status : 'ongoing'| 'completed'
};

type TModalProps = {
  setOpenModal : React.Dispatch<React.SetStateAction<boolean>>
}


export default function CreateTodoModal({ setOpenModal} : TModalProps) {
  const [createTodo, { isLoading }] = useCreateTodoMutation();


  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const form  = new FormData(e.target);
    
  const title = form.get('title') as string
  const deadline = form.get('deadline') as string
  const priority = form.get('priority') as string


    const todoData : TTodo = {
      title, deadline, priority, status : 'ongoing',
      }

      try {
          const response =  await createTodo(todoData).unwrap();
      
        if(response?.success){
          // close the modal 
          setOpenModal(false)
          // show a toast 
          toast.success('Created a new task')
        }
        }catch(error){
          toast.error('Something went wrong')
          console.log(error)
        }
    }
  


  return (
    <section className="w-screen fixed inset-0 bottom-0 z-50  bg-black/20  backdrop-blur-sm dark:backdrop-blur-lg flex justify-center items-center py-10 overflow-y-auto px-4">  
       
       <form className="w-full md:w-[700px] h-fit bg-white dark:bg-gray-800 rounded-md relative" onSubmit={handleSubmit}>

        {/* loading white layer  */}
      {isLoading && <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-50 bg-white/80 dark:bg-black/30  rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#3B82F6'
           loading={isLoading}
          //  cssOverride={override}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}


<div className="p-6 space-y-6">
      {/* Title Input */}
      <div className="flex items-center space-x-3">
        <FaPen className="text-gray-500 text-xl" />
        <input name="title"
          type="text"
          placeholder="Post Title"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Input */}
      <div className="flex items-center space-x-3">
        <FaListAlt className="text-gray-500 text-xl" />
       
        <select name="priority" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none text-gray-500"  >
              <option disabled selected>Select Priority</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
        </select>

      </div>

      <div className="space-y-2">
      <label className="font-semibold text-gray-500">Task Deadline</label>
        
        <div className="flex items-center space-x-3">
        <FaListAlt className="text-gray-500 text-xl" />
       
       <input type="date" name="deadline" defaultValue={''}
          className="w-full p-3 border text-gray-500 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
        />
        </div>

      </div>

    </div>
       

<button type="submit" className="px-8 text-sm lg:text-base ml-9 mb-5 md:mb-4 mx-3 py-2 md:py-2 font-semibold text-white rounded transition bg-blue-600 hover:bg-blue-700 "> Create</button>

<button onClick={() => setOpenModal(false)} className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-gray-600 rounded transition bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-gray-300 dark:text-gray-300"> Close </button>
</form>
       
       </section>
  )
}
