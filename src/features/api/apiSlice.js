import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    // ?title_like=css&title_like=tailwind&_limit=4
    getReletedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")}&_limit=4`;
        return queryString;
      },
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,    
      }),
    }),
  }),
});

console.log(apiSlice);

export const { useGetVideosQuery, useGetVideoQuery, useGetReletedVideosQuery, useAddVideoMutation } = apiSlice;
