import React from "react";
import { Request } from "../services/requests";


const useHttp = () => {

    const [isLoading, setIsloading] = React.useState(false);
    const [error, setError] = React.useState(null);


    const sendRequest = React.useCallback((action, responseHandler, errorHandler) => {

        setIsloading(true);
        return Request[action]()
            .then(data => {
                setIsloading(false);
                console.log('In the use-Http Hook');
                responseHandler(data);
            })
            .catch(err => {
                err.then(error => {
                    setIsloading(false);
                    console.log(error);
                    errorHandler(error);
                })
            });
    },[])


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;