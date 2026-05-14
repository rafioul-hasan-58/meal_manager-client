
import { baseApi } from "../../api/baseApi";

const faqsContactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/faq/get-all`,
          method: "GET",
          params: { page, limit },
        };
      },
      providesTags: ["faqs"],
    }),
    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/faq/get/${id}`,
        method: "GET",
      }),
      providesTags: ["faqs"],
    }),

    createFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/faq/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faqs"],
    }),

    updateFaq: builder.mutation({
      query: (data) => {
        return {
          url: `/faq/update/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["faqs"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faqs"],
    }),
    getContactRequests: builder.query({
      query: ({ page, limit }) => ({
        url: "/contactMessage/get-all",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["message"],
    }),
    getSingleContactRequest: builder.query({
      query: (id) => ({
        url: `/contactMessage/get/${id}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqsQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetContactRequestsQuery,
  useGetSingleContactRequestQuery,
} = faqsContactApi;
