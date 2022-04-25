$(document).ready(function(){
    //console.log(drink)
    console.log(drink["ingredients"])
    let ing = drink["ingredients"]
    for (let i in ing){
        i_ID = "i".concat(i)
        console.log(i_ID)
        console.log(ing[i])
    }
})