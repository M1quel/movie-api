import axios from "axios";

export default async function fetchMovies (options) {
    return axios.request(options).then(function (response) {
        document.querySelector(".searchCheck").checked = false;
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}