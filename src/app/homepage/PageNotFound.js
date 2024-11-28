import { Helmet } from "react-helmet";

function PageNotFound () {
    return (
        <>
            <Helmet>
                <title>404</title>
            </Helmet>
            <h1>Page not found</h1>
        </>
    )
}

export default PageNotFound;