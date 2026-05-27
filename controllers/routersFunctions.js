import { posts } from "../data/ricettePosts.js";
import { idCheck, idGenerator, OBJcheck, slugGenerator } from "../functions/function.js";
import { defaultOBJ } from "../data/ricettePosts.js";


/*---------------------------------------------------------------------
INDEX
---------------------------------------------------------------------*/
export function index(request, response) {
 throw new Error('Eeeeeeeh abbiamo superato il kilowatt')
    const { tag, maxPrepTime } = request.query;
    const maxPrepTimeChecked = Number(maxPrepTime.trim());
    let filtredPosts = [...posts];
    if (tag !== undefined) {
        const searchTag = tag.toLowerCase();
        filtredPosts = filtredPosts.filter(post => post.tags.map(tag => tag.toLowerCase()).includes(searchTag));
    }
    if (!isNaN(maxPrepTimeChecked)) {
        filtredPosts = filtredPosts.filter(post => post.prep_time <= maxPrepTimeChecked);
    }
    if (!filtredPosts || filtredPosts.length === 0) {
        response
            .status(404)
            .json({
                error: "nessun post é stato trovato",
                result: null
            });
        return
    }
    response.json({
        error: null,
        result: filtredPosts
    });

}



/*---------------------------------------------------------------------
SHOW
---------------------------------------------------------------------*/
export function show(request, response) {
    /* const id = Number(request.params.id.trim());
    if (!idCheck(id)) {
        response
            .status(400)
            .json({
                error: "l'ID passato non é valido, Deve essere un numero intero maggiore di zero.",
                result: null
            });
        return
    }; */

    const slug = request.params.slug.trim();

    const post = posts.find(post => post.slug === slug);
    if (post === undefined) {
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



/*---------------------------------------------------------------------
STORE
---------------------------------------------------------------------*/
export function store(request, response) {

    const receivedData = request.body || {};

    if (!OBJcheck(receivedData)) {
        response
            .status(400)
            .json({
                error: "l'ogetto passato non rispetta i parametri richiesti",
                result: null
            })
        return
    }
    const newPost = { ...defaultOBJ, ...receivedData, id: idGenerator(), slug: slugGenerator(receivedData), created_at: new Date().toISOString()}
    posts.push(newPost);
    response
        .status(201)
        .json({
            message: 'Post aggiunto con successo',
            result: posts
        });
}



/*---------------------------------------------------------------------
UPDATE
---------------------------------------------------------------------*/
export function update(request, response) {
    /*const id = Number(request.params.id);
     if (!idCheck(id)) {
        response
            .status(400)
            .json({
                error: "l'ID passato non é valido, Deve essere un numero intero maggiore di zero.",
                result: null
            });
        return
    }; */
    
    const slug = request.params.slug.trim();
    const postIndex = posts.findIndex(post => post.slug === slug);
    if (postIndex === -1) {
        response
            .status(404)
            .json({
                error: "il post che stai cercando di aggiornare non esiste",
                result: null
            });
        return
    }
    const post = posts[postIndex];
    const receivedData = request.body || {};
    if (!OBJcheck(receivedData)) {
        response
            .status(400)
            .json({
                error: "l'ogetto passato non rispetta i parametri richiesti",
                result: null
            })
        return
    }
    const updatedPost = { ...post, ...receivedData };
    if (post.title !== updatedPost.title){
        updatedPost.slug = slugGenerator(updatedPost);
    }
    posts.splice(postIndex, 1, updatedPost);
    response
        .json({
            error: null,
            result: 'il post é stato aggiornato con successo'
        });
}





/*---------------------------------------------------------------------
MODIFY
---------------------------------------------------------------------*/
export function modify(request, response) {
    //const id = Number(request.params.id);
    const slug = request.params.slug.trim();
    response.json(`richiesta di modificare parti del post con lo slug ${slug}`);
}




/*---------------------------------------------------------------------
DESTROY
---------------------------------------------------------------------*/
export function destroy(request, response) {
/*     const id = Number(request.params.id);
    if (!idCheck(id)) {
        response
            .status(400)
            .json({
                error: "l'ID passato non é valido, Deve essere un numero intero maggiore di zero.",
                result: null
            });
        return
    }; */
    const slug = request.params.slug.trim();
    const postIndex = posts.findIndex(post => post.slug === slug);
    if (postIndex === -1) {
        response
            .status(404)
            .json({
                error: "il post che stai cercando di eliminare non esiste",
                result: null
            });
        return
    }
    posts.splice(postIndex, 1);
    response
        .json({
            error: null,
            result: 'il post é stato eliminato con successo'
        });
}