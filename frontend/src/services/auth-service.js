//used for post request to save new user
export const signUp = async (user) =>{ //Make it async because it will return a promise
    console.log("Frontend: "+ user)
    return fetch('http://localhost:8081/signup', {method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body:JSON.stringify(user)})
}

export const signIn = async (user) =>{ //Make it async because it will return a promise
    console.log("Frontend: ", user.email , user.password)
    return fetch('http://localhost:8081/signin', {method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(user)})
    // return response.json()
}

export const updateUser = async (id, user) => {
    return fetch(`http://localhost:8081/user/${id}`, {method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(user)})
}

export const updatePwd = async (id, pwd) => {
    return fetch(`http://localhost:8081/pwd/${id}`, {method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(pwd)})
}