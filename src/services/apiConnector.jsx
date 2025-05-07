

import axios from 'axios'

const axiosinstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers,params) => {
    console.log('printing bodydata', bodyData)
    return axiosinstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
        })
        
}