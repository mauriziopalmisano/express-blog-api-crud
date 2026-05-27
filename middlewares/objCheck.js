import { validator } from "../functions/function.js";


function objCheck (request, response, next) {
    const receivedData = request.body || {};
    
        if (!validator(receivedData)) {
            response
                .status(400)
                .json({
                    error: "l'ogetto passato non rispetta i parametri richiesti",
                    result: null
                })
            return
        }
        next()
}


export default objCheck