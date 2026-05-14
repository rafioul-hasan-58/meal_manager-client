import { baseApi } from "../../api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllSkill: builder.query({
      query: ({ searchTerm, skillCategory }) => {
        return {
          url: `/skill/get-my`,
          method: "GET",
          params: { searchTerm, skillCategory },
        };
      },
      providesTags: ["skill"],
    }),
    getSingleSkill: builder.query({
      query: (id) => ({
        url: `/skill/details/${id}`,
        method: "GET",
      }),
      providesTags: ["skill"],
    }),

    createSkill: builder.mutation({
      query: (data) => {
        return {
          url: "/skill/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["skill"],
    }),

    updateSkill: builder.mutation({
      query: (data) => {
        return {
          url: `/skill/update/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
      invalidatesTags: ["skill"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => {
        return {
          url: `/skill/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["skill"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useGetSingleSkillQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetMyAllSkillQuery,
} = skillApi;
