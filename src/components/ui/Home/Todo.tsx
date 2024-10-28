import { TTodo } from "../Modal/CreateTodoModal";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { GiSerratedSlash } from "react-icons/gi";
import EditTodoModal from "../Modal/EditTodoModal";
import { useState } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../../../redux/features/todo/todoApi";
import { toast } from "sonner";


const Todo = ({todo} : {todo : TTodo}) => {
    const [ openEditModal, setOpenEditModal] = useState(false)
    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();


    // update the status on todo 
    const handleUpdateStatus = async (todoId : string) => {
          try {
              const response =  await updateTodo({
                todoId,
                payload : { status : 'completed'}
              }).unwrap();
          
            if(response?.success){
              toast.success('Marked as completed.')
            }
            }catch(error){
              toast.error('Something went wrong')
              console.log(error)
            }
        }

    return (
        <div  className={`p-3 
        ${todo?.priority === 'low' &&'bg-gray-100'}
        ${todo?.priority === 'medium' && 'bg-yellow-100'}
        ${todo?.priority === 'high' && 'bg-red-200'}
        ${todo?.status === 'completed' && 'bg-gray-300'}
         my-4 relative rounded-md `}>

            {/* showing the completed indicator if the task is completed  */}
            {todo?.status === 'completed' &&  <div className="absolute inset-0 w-full h-full bg-white/80 z-20 flex items-center justify-center">

            <span className=" text-lime-500 flex items-center gap-1  p-1 rounded-md text-2xl font-bold"> <IoCheckmarkCircleOutline size={25} />Completed</span>
            </div>}
            
        <div className="absolute top-0 right-0 flex items-center gap-3 p-4">
       
       {todo?.status === 'ongoing' &&  <button onClick={()=> handleUpdateStatus(todo?._id as string)} className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap"> <IoCheckmarkCircleOutline size={17} /> Mark as complete </button>}


        {/* rending the edit modal when the openEditModal is true  */}
        {openEditModal && <EditTodoModal 
        todo={todo}
        setOpenModal={setOpenEditModal}/> }

        <button onClick={()=> setOpenEditModal(true)}  className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap relative z-40"> <MdModeEdit size={17} />Edit </button>

        <button onClick={()=> deleteTodo(todo?._id as string)} className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap relative z-40"> <TiDelete size={17} />Delete</button>

        </div>
    <h1 className="text-base lg:text-xl  text-gray-600 flex items-center gap-3 pt-14 font-prompt  flex-wrap"> <SiTodoist size={25}/>  {todo?.title}  </h1>

   
 <div className="flex items-center gap-3 justify-between">
 <span className="flex items-center gap-2 my-2 text-gray-500"> <MdAccessTime/> Deadline : {todo?.deadline} </span>

<span  className=" text-gray-400 flex items-center gap-1  p-1 rounded-md whitespace-nowrap capitalize"> <GiSerratedSlash size={18} />{todo?.priority}</span>
 </div>
  
    </div>
    );
};

export default Todo;