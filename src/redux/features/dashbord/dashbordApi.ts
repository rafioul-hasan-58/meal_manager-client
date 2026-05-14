import { baseApi } from "../../api/baseApi";

const dashbordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashbaordOverviewAdmin: builder.query({
      query: ({ limit, page, searchTerm }) => {
        return {
          url: `/user/admin/dashboard/overview`,
          method: "GET",
          params: { limit, page, searchTerm },
        };
      },
      providesTags: ["dashbaord", "user"],
    }),
    getDashbaordOverviewUser: builder.query({
      query: () => {
        return {
          url: `/user/dashboard/overview`,
          method: "GET",
        };
      },
      providesTags: ["dashbaord", "user"],
    }),
    getSingleExample: builder.query({
      query: (id) => ({
        url: `example/${id}`,
        method: "GET",
      }),
      providesTags: ["example"],
    }),
    getMonthlyInsight: builder.query({
      query: () => {
        return {
          url: `/user/dashboard/monthly-insight`,
          method: "GET",
        };
      },
      providesTags: ["dashbaord", "user"],
    }),
    createAccomplishment: builder.mutation({
      query: (data) => {
        return {
          url: "/accomplishment/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["dashbaord", "user"],
    }),
    updateExample: builder.mutation({
      query: (data) => {
        return {
          url: `example/${data?.id}`,
          method: "POST",
          body: data?.formData,
        };
      },
      invalidatesTags: ["example"],
    }),
    deleteExample: builder.mutation({
      query: (id) => {
        return {
          url: `example/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["example"],
    }),
  }),
});

export const {
  useGetDashbaordOverviewAdminQuery,
  useGetSingleExampleQuery,
  useUpdateExampleMutation,
  useDeleteExampleMutation,
  useGetDashbaordOverviewUserQuery,
  useGetMonthlyInsightQuery,
} = dashbordApi;
