export const idCheck = (id) => {
    return typeof id === "number" && !isNaN(id) && id > 0;
}