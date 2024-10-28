
import { TTodo } from "../../../components/ui/Modal/CreateTodoModal";
import baseApi from "../../api/baseApi";


const todoApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        createTodo : builder.mutation({
            query: (todo : TTodo) => ({
                url : '/api/todos',
                method : "POST",
                body: todo,   
            }),
           invalidatesTags: ['Todos']
        }),

        getTodos : builder.query({
            query: () => ({
                url : '/api/todos',
                method : "GET",
            }),
            providesTags: ['Todos']
        }),

        deleteTodo : builder.mutation({
            query: (todoId: string) => ({
                url : `/api/todos/delete/${todoId}`,
                method : "DELETE",   
            }),
            invalidatesTags: ['Todos']
        }),

        updateTodo : builder.mutation({
            query: ({ todoId , payload } : { todoId: string, payload: Partial<TTodo>}) => ({
                
                url : `/api/todos/update/${todoId}`,
                method : "PATCH", 
                body : payload,  
            }),
            invalidatesTags: ['Todos' ]
        }),

    })
})

export const {
    useCreateTodoMutation,
     useGetTodosQuery,
      useUpdateTodoMutation,
       useDeleteTodoMutation,
    } = todoApi;