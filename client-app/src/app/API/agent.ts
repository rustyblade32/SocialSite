import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responsBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(500)).then(responsBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(500)).then(responsBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(500)).then(responsBody),
    delete: (url: string) => axios.delete(url).then(sleep(500)).then(responsBody)
}


const Activities = {
    list: (): Promise<IActivity[]> => requests.get("/activities"),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post("/activities", activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}


export default {
    Activities
}