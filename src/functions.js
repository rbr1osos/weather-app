export function timeDifference(testing){
    const today = (new Date()).getHours();
    const inputHour = new Date(testing).getHours();
        const result = inputHour - today;
        return(result+'h')
}