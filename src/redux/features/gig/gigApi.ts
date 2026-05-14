import { baseApi } from "../../api/baseApi";

const gigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGig: builder.query({
      query: ({page,limit }) => ({
        url: `/gig/get-all`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["gig"],
    }),
    getSingleGig: builder.query({
      query: (id) => ({
        url: `/gig/get-gig/${id}`,
        method: "GET",
      }),
      providesTags: ["gig"],
    }),
    createGig: builder.mutation({
      query: (data) => {
        return {
          url: "/gig/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["gig"],
    }),
    updateGig: builder.mutation({
      query: (data) => {
        return {
          url: `/gig/update/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["gig"],
    }),
    deleteGig: builder.mutation({
      query: (id) => {
        return {
          url: `/gig/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["gig"],
    }),
    getSavedGigs: builder.query({
      query: () => ({
        url: `/gig/my-saved`,
        method: "GET",
      }),
      providesTags: ["gig"],
    }),
    saveGig: builder.mutation({
      query: (id) => ({
        url: `/gig/save/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["gig"],
    }),
    applyGig: builder.mutation({
      query: (id) => ({
        url: `/gig/apply/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["gig"],
    }),
  }),
});

export const {
  useCreateGigMutation,
  useGetAllGigQuery,
  useGetSingleGigQuery,
  useUpdateGigMutation,
  useDeleteGigMutation,
  useGetSavedGigsQuery,
  useSaveGigMutation,
  useApplyGigMutation,
} = gigApi;
