import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery : fetchBaseQuery({

        baseUrl : 'http://localhost:3000',
        // baseUrl : 'https://assignment-three-seven.vercel.app',
    }),
    
    tagTypes: ['Todos'],
    endpoints: () => ({})
})

export default baseApi;