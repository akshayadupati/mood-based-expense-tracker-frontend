import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "https://mood-expense-tracker-app.herokuapp.com";
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),

    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),

    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: "/api/transaction",
        method: "DELETE",
        body: transactionId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
