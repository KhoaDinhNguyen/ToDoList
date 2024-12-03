async function fetchSignIn(accountName, password) {
    const environment = process.env.NODE_ENV;
    //console.log(environment);
    const signInAPI = process.env[`REACT_APP_LOGIN_API_URL_${environment.toUpperCase()}`];
    const signInEndpoint = `${signInAPI}`;
    //console.log(signInEndpoint);

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

const fetchFindAccount = async(accountName) => {
    const environment = process.env.NODE_ENV;
    const findAccountAPI = process.env[`REACT_APP_FIND_ACCOUNT_API_URL_${environment.toUpperCase()}`];
    const findAccountEndpoint = `${findAccountAPI}`;

    const body = JSON.stringify({
        accountName
    });

    try {
        const jsonResponse = await fetch(findAccountEndpoint, {
            method: 'POST',
            body,
            headers: {
                'Content-type': 'application/json'
            }
        });

        const response = await jsonResponse.json();

        return response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export {
    fetchSignIn,
    fetchSignUp,
    fetchFindAccount
};
