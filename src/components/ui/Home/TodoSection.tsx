import { useState } from "react";
import Container from "../../layout/Container";

import { FaPlus } from 'react-icons/fa';
import CreateTodoModal, { TTodo } from "../Modal/CreateTodoModal";
import { useGetTodosQuery } from "../../../redux/features/todo/todoApi";

import Todo from "./Todo";

const TodoSection = () => {
    const [ openCreateModal, setOpenCreateModal] = useState(false)

    const { data} = useGetTodosQuery(undefined);
    const todos : TTodo[]  = data?.data || [];

    return (
       <Container>

          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-600 mb-4 text-center">Create Your Todo</h2>

        {/* render the modal based on the modal state  */}
        {openCreateModal && <CreateTodoModal setOpenModal={setOpenCreateModal} />}


        {/* Input Button Section */}
        <div className="flex gap-2 mb-6">
          <button onClick={()=> setOpenCreateModal(true)}
            className="w-full text-gray-400 text-left p-3 rounded-md border border-gray-300"
          >Add a new task </button>
          <button onClick={()=> setOpenCreateModal(true)} className="p-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            <FaPlus />
          </button>
        </div>


        {/* Todo List Section */}
        <section className="space-y-3">
          
          {todos?.map(todo =>  <Todo key={todo?._id} todo={todo}/>)}
        </section>
      </div>
    </div>
       </Container>
    );
};

export default TodoSection;