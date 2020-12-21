// TODO ENLEVER ACCESS TOKEN EN DUR

export const doRequest = (url, data) => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", "e31044r4d7oqge4odpsqg7xeet90oz");
    myHeaders.append("Authorization", "Bearer i7vmph6ootlnq25jw6t8whrzoh38pq");
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    return (fetch(url, requestOptions))
}