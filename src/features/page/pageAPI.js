async function fetchSignIn(accountName, password) {
    const environment = process.env.NODE_ENV;
    const signInAPI = process.env[`REACT_APP_LOGIN_API_URL_${environment.toUpperCase()}`];
    const signInEndpoint = `${signInAPI}`;

    const data = JSON.stringify({
        accountName,
        password
    });
    try {
        const jsonResponse = await fetch(signInEndpoint, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type' : 'application/json'
            },
        })
        const response = await jsonResponse.json();

        return response;
    }
    catch (error) {
        console.log(error);
    }
};

async function fetchSignUp(accountName, profileName, password) {
    const environment = process.env.NODE_ENV;
    const signUpAPI = process.env[`REACT_APP_SIGN_UP_API_URL_${environment.toUpperCase()}`];
    const signUpEndpoint = `${signUpAPI}`;

    const data = JSON.stringify({
        accountName,
        profileName,
        password
    });
    try {
        const jsonResponse = await fetch(signUpEndpoint, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type' : 'application/json'
            },
        });
        const response = await jsonResponse.json();

        return response;
    }
    catch(err) {
        throw new Error(err);
    }
};

export {
    fetchSignIn,
    fetchSignUp
};
