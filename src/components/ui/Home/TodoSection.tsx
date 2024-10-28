import { useState } from "react";
import Container from "../../layout/Container";

import { FaPlus } from 'react-icons/fa';
import CreateTodoModal, { TTodo } from "../Modal/CreateTodoModal";
import { useGetTodosQuery } from "../../../redux/features/todo/todoApi";
import { IoCheckmarkCircleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { SiTodoist } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { MdModeEdit } from "react-icons/md";
import { GiSerratedSlash } from "react-icons/gi";

const TodoSection = () => {
    const [ openModal, setOpenModal] = useState(false)

    const { data} = useGetTodosQuery(undefined);
    const todos : TTodo[]  = data?.data || [];

    return (
       <Container>

          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-600 mb-4 text-center">Create Your Todo</h2>

        {/* call the modal based on the modal state  */}
        {openModal && <CreateTodoModal setOpenModal={setOpenModal} />}

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <button onClick={()=> setOpenModal(true)}
            className="w-full text-gray-400 text-left p-3 rounded-md border border-gray-300"
          >Add a new task </button>
          <button className="p-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            <FaPlus />
          </button>
        </div>


        {/* Todo List Section */}
        <section className="space-y-3">
          {/* Single Todo Item */}
          
          {todos?.map(todo =>  <div key={todo?._id} className={`p-2 ${todo?.priority === 'low' &&'bg-gray-100'} ${todo?.priority === 'medium' && 'bg-yellow-100'} ${todo?.priority === 'high' && 'bg-red-200'} my-4 relative rounded-md `}>
            
            <div className="absolute top-0 right-0 flex items-center gap-3 p-4">
           
            <span  className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap"> <IoCheckmarkCircleOutline size={17} /> Mark as complete </span>

            <span  className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap"> <MdModeEdit size={17} />Edit </span>

            <span  className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1 border border-[#00719C] p-1 rounded-md text-xs whitespace-nowrap"> <TiDelete size={17} />Delete</span>

            </div>
        <h1 className="text-base lg:text-xl  text-gray-600 flex items-center gap-3 pt-14 font-prompt  flex-wrap"> <SiTodoist size={25}/>  {todo?.title}  </h1>

       
     <div className="flex items-center gap-3 justify-between">
     <span className="flex items-center gap-2 my-2 text-gray-400"> <MdAccessTime/> Deadline : {todo?.deadline} </span>

    <span  className=" text-[#00719C] hover:bg-slate-200 flex items-center gap-1  p-1 rounded-md whitespace-nowrap"> <GiSerratedSlash size={18} />Priority : <span className="capitalize"> {todo?.priority}</span></span>
     </div>
      
        </div>)}
        </section>
      </div>
    </div>
       </Container>
    );
};

export default TodoSection;