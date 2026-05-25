import { posts } from "../data/ricettePosts.js";
import { idCheck } from "../functions/function.js";



export function index(request, response) {
    response.json(posts);
}

export function show(request, response) {
    const id = Number(request.params.id.trim());
    if(!idCheck(id)){
        response
            .status(404)
            .json({
                error: "l'ID passato non é valido, Deve essere un numero intero maggiore di zero.",
                result: null
            });
            return
    };
    const post = posts.find(post => post.id === id);
    if (!post){
        response
            .status(404)
            .json({
                error: "Il post non esiste",
                result: null
            });
            return
    }
    response.json({
        error: null,
        result: post
    });
}

export function store(request, response) {
    response.json('richiesta di aggiungere un post');
}

export function update(request, response) {
    const id = Number(request.params.id);
    response.json(`richiesta per aggiornare il post con l'id:${id}`);
}

export function modify(request, response) {
    const id = Number(request.params.id);
    response.json(`richiesta di modificare parti del post con l'id:${id}`);
}

export function destroy(request, response) {
    const id = Number(request.params.id);
    response.json(`richiesta per rimuovere il post con l'id:${id}`);
}