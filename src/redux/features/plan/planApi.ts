import { baseApi } from "../../api/baseApi";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlan: builder.query({
      query: () => {
        return {
          url: `/plan/get-all`,
          method: "GET",
        };
      },
      providesTags: ["plan"],
    }),
    getPlanById: builder.query({
      query: (id) => {
        return {
          url: `/plan/details/${id}`,
          method: "GET",
        };
      },
      providesTags: ["plan"],
    }),
    createPlan: builder.mutation({
      query: (data) => {
        return {
          url: "plan/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["plan"],
    }),
    updatePlan: builder.mutation({
      query: (data) => {
        return {
          url: `plan/update/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["plan"],
    }),
    deletePlan: builder.mutation({
      query: (id) => {
        return {
          url: `plan/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["plan"],
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetAllPlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useGetPlanByIdQuery,
} = planApi;
