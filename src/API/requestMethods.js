import axios from "axios";

const BASE_URL= "http://127.0.0.1:8000/";
const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDJlNTNiMzgzODM0ZjQxMmEyOGM1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYwMDgzOSwiZXhwIjoxNjY2NjE4ODM5fQ.GFpDpnMA2eSHm1GVzfZeGGW3--cc2nVTRFIHkb2BSgE"

export const publicRequest= axios.create({
    baseURL: BASE_URL,
});

export const authRequest= axios.create({
    baseURL: BASE_URL,
    header: { Authorization: `Bearer ${TOKEN}`}
})