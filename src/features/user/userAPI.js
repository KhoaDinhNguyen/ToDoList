const getUserDatabaseAPI = process.env.REACT_APP_PROD_GET_USER_DATABASE_API_URL;

const fetchUserDatabase = async (accountName) => {
    const endpoint = `${getUserDatabaseAPI}/${accountName}`;

    try {
        const jsonResponse = await fetch(endpoint, {
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