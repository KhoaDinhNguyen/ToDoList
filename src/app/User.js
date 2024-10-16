import { useParams } from "react-router-dom";

const url = "http://localhost:8080/";
function User(){
    const params = useParams();
    const userName = params.username;
    const endpoint = url + userName;
    let result;
    const fetchData = (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Network..")
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }

    fetchData(endpoint)
    .then(data => {
        console.log(data);
        result = data;
    })
    .catch(error => console.log(error));

    return (
        <>
            <p>{userName}</p>
            <p></p>
        </>
    )
}

export default User;