import { baseApi } from "../../api/baseApi";

const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createResume: builder.mutation({
      query: (data) => ({
        url: "/resumeProfile/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["resume"],
    }),
    getUserResume: builder.query({
      query: () => ({
        url: `/resumeProfile/get-my`,
        method: "GET",
      }),
      providesTags: ["resume"],
    }),
    updatePersonalInfo: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/resume/update-personal-info/${id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["resume"],
    }),
    addWorkExperience: builder.mutation({
      query: (data) => ({
        url: "/resume/add-work-experience",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["resume"],
    }),
    updateWorkExperience: builder.mutation({
      query: (data) => ({
        url: "/resume/update-work-experience",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["resume"],
    }),
    addEducation: builder.mutation({
      query: (data) => ({
        url: "/resume/add-education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["resume"],
    }),
    updateEducation: builder.mutation({
      query: (data) => {
        return {
          url: `/resume/update-education`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["resume"],
    }),
    addSkill: builder.mutation({
      query: (data) => ({
        url: "/resume/add-resume-skill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["resume"],
    }),
    updateSkills: builder.mutation({
      query: (data) => {
        return {
          url: `/resume/update-resume-skills`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["resume"],
    }),
    deleteResume: builder.mutation({
      query: (id) => {
        return {
          url: `/resume/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["resume"],
    }),
  }),
});

export const {
  useCreateResumeMutation,
  useUpdatePersonalInfoMutation,
  useAddWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteResumeMutation,
  useUpdateEducationMutation,
  useUpdateSkillsMutation,
  useGetUserResumeQuery,
  useAddEducationMutation,
  useAddSkillMutation,
} = resumeApi;
