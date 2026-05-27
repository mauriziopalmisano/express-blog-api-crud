import { posts } from "../data/ricettePosts.js";


function paramsRouter(request, response, next){
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
    const postindex = posts.findIndex(post => post.slug === slug);
        request.postfound = post;
        request.postindex = postindex;
        next();


}

export default paramsRouter