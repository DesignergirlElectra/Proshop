import { PRODUCTS_URL , UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
      
        keepUnusedDataFor: 5, // Keep unused data for 5 seconds
        providesTags: ['Products']
      }),
      getProductDetails: builder.query({
        query:(productID) => ({
          url: `${PRODUCTS_URL}/${productID}`
        }),
        keepUnusedDataFor: 5, // Keep unused data for 5 seconds
      }),
      createProduct: builder.mutation({
        query: () => ({
          url: PRODUCTS_URL,
          method: 'POST',
        }),
       invalidatesTags: ['Products'] // Keep unused data for 5 seconds
      }),
      updateProduct: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data,
        }),
       invalidatesTags: ['Products'] // Keep unused data for 5 seconds
      }),
      uploadProductImage : builder.mutation({
        query: (data) => ({
          url: `${UPLOAD_URL}`,
          method: 'POST',
          body : data
        }),
       invalidatesTags: ['Products'] // Keep unused data for 5 seconds
      }),
      deleteProduct : builder.mutation({
        query : (productId) =>  ({
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
        })
      })
    }),
     // Add this line to prevent endpoint overriding issues
  });
  
  export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation ,
    useUpdateProductMutation, useUploadProductImageMutation , useDeleteProductMutation} = productsApiSlice;