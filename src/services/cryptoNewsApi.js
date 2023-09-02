import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const cryptoApiHeaders={
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'bb864cba05msh235b6a5cdd4bbd8p15b266jsn9cc3d20232b9',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
  const cryptoApiParams={
    safeSearch: 'Off',
    textFormat: 'Raw'
  }
  const baseUrl='https://bing-news-search1.p.rapidapi.com'
  const createRequest=(url)=>({ method: 'GET',url ,headers:cryptoApiHeaders, params:[]})
  export const cryptoNewsApi=createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=> ({
        getCryptoNews:builder.query({
            query:({newsCategory, count})=> 
            {
                return createRequest(baseUrl+`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`) 
            }
        })
    })
})
export const {
    useGetCryptoNewsQuery,
} =cryptoNewsApi