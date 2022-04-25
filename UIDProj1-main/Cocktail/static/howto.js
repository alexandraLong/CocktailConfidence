$(document).ready(function(){

    let i_list = $("<div>")
    $.each(drink["ingredients"], function(index,value){
        let check = $('<input type="checkbox">')
        let name = "i".concat(String(index))
        $(check).attr("name", name)
        $(check).attr("id", name)
        $(i_list).append(check)
        let lab = $("<label>")
        console.log(lab)
        $(lab).attr("for",name)
        $(i_list).append(lab)
        $(lab).html(value)
        $(i_list).append("<br>")
    })
    $("#ingredients").append(i_list)
})