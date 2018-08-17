export const getHeaders = () => {

    const requestsHeader = {
        'Content-Type': 'application/json',
        'Key': 'bitbookdev',
    }

    if (localStorage.getItem("sessionId")) {
        requestsHeader['SessionId'] = localStorage.getItem("sessionId");
    }

    return requestsHeader;
}

export const get = (url) => {

    return fetch(url, {

        headers: getHeaders(),
    })
        .then(response => {
           return response.json()
        })
}

export const post = (url, newContent) => {

    const postData = {
        method: 'POST',
        body: JSON.stringify(newContent),
        headers: getHeaders(),
    }
    return fetch(url, postData)
}

export const put = (url, data) => {

    return fetch(url, {

        method: 'PUT',
        body: JSON.stringify(data),
        headers: getHeaders(),
    })

}

export const deleteData = (url) => {

    return fetch(url, {

        method: 'DELETE',
        headers: getHeaders(),
    })
}

