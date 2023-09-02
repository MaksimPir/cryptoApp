import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'X-RapidAPI-Key': 'bb864cba05msh235b6a5cdd4bbd8p15b266jsn9cc3d20232b9',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
const cryptoApiParams={
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '7d',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  }
const baseUrl='https://coinranking1.p.rapidapi.com'
const createRequest=(url,period='24h')=>({ method: 'GET',url ,headers:cryptoApiHeaders, params:{...cryptoApiParams,timePeriod:period}})


export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=> ({
        getCryptos:builder.query({
            query:(count)=> 
            {
                return createRequest(baseUrl+`/coins?limit=${count}`) 
            }
        }),
        getCryptoDetails:builder.query({
            query:(idCoin)=> 
            {
                return createRequest(baseUrl+`/coin/${idCoin}`) 
            }
        }),
        getCryptoHistory:builder.query({
            query:({coinId, timePeriod})=> 
            {
                console.log('asd', coinId, timePeriod);
                return createRequest(baseUrl+`/coin/${coinId}/history`,'24h') 
            }
        })
    })
})
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} =cryptoApi