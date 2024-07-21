import { BASE_URL } from "../constants";
import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({baseUrl : BASE_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product' ,'Order' ,'Users'],
    endpoints:(builder)=>({})
})