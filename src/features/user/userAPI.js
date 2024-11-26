const fetchUserDatabase = async (accountName) => {
    const environment = process.env.NODE_ENV;
    const getUserDatabaseAPI = process.env[`REACT_APP_GET_USER_DATABASE_API_URL_${environment.toUpperCase()}`];
    const getUserEndpoint = `${getUserDatabaseAPI}/${accountName}`;

    try {
        const jsonResponse = await fetch(getUserEndpoint, {
            method: 'GET',
        });

        const response = await jsonResponse.json();

        return response;
        
    }
    catch(err) {
        throw new Error(err.message);
    }
};

export {
    fetchUserDatabase
}