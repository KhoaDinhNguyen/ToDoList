const signInAPI = process.env.REACT_APP_LOGIN_API_URL;
const signUpAPI = process.env.REACT_APP_SIGN_UP_API_URL;

async function fetchSignIn(accountName, password) {
    const data = JSON.stringify({
        accountName,
        password
    });
    try {
        const jsonResponse = await fetch(signInAPI, {
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
    const data = JSON.stringify({
        accountName,
        profileName,
        password
    })
    try {
        const jsonResponse = await fetch(signUpAPI, {
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
