import axios from "axios";

export const setLoadingInterceptor = ({ showLoader, hideLoader }) => {

    axios.interceptors.request.use(
        req => {
            showLoader();
            return req;
        },
        err => {
            hideLoader();
            return Promise.reject(err);
        }
    )

    axios.interceptors.response.use(
        res => {
            hideLoader();
            return res;
        },
        err => {
            hideLoader();
            return Promise.reject(err);
        }
    )
}

export default setLoadingInterceptor