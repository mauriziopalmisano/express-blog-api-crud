function errorHandler(error, request, response, next){
    response
        .status(500)
        .json({
            error: `errore con la connessione al server`,
            result: null
        });

}

export default errorHandler