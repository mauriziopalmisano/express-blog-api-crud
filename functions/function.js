import { defaultOBJReceived, posts } from "../data/ricettePosts.js";


export const idCheck = (id) => {
    return typeof id === "number" && !isNaN(id) && id > 0;
}

const objKeysCheck = (obj) => {
    const chiaviDefaultOBJ = Object.keys(defaultOBJReceived);
    const chiaviObj = Object.keys(obj);

    if(chiaviObj.length !== chiaviDefaultOBJ.length){
        return false
    }
    return chiaviDefaultOBJ.every(chiave => obj.hasOwnProperty(chiave));
}

const objvaluescheck = (obj) => {
    const {title, content, image, tags, prep_time} = obj;

    if (typeof title !== 'string' || title.trim() === '') return false;
    if (typeof content !== 'string' || content.trim() === '') return false;
    if (typeof image !== 'string' || image.trim() === '' ) return false;
    
    if (typeof prep_time !== 'number' || prep_time <= 0 || Number.isNaN(prep_time)) return false;
    
    if (!Array.isArray(tags) || tags.length === 0 ) return false;
    if (tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) return false;
    
    return true;
}


export const OBJcheck = (obj) => {
    if(!objKeysCheck(obj)) return false;
    return objvaluescheck(obj);
}

export const idGenerator = () => {
    const lastElementID = posts[posts.length-1].id;
    let newID = lastElementID

    do {
        newID++;
    } while (posts.some(post => post.id === newID));

    return newID;
}

export const slugGenerator = (obj) => {
    let slug = obj.title.replaceAll(' ', '-').toLowerCase();
    let counter = 0 ;
    

    do {
        slug = counter === 0 ? slug : slug + `-${counter}`;
        counter++;
    } while (posts.some(posts => posts.slug === slug));
    return slug;
}