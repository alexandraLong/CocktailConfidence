$(document).ready(function() {
        let new_div = "<div>" + quiz.questions[qno-1] + "<br> (select all that apply)</div>"
        $("#question").append(new_div)

        let q = "Question  " + (qno) + "/5"
        $("#question_number").prepend(q)

        // $form = $("<form></form>")
        let form = '<input type="radio" id = "1" value="'+quiz.options[qno-1][0]+'"><label for = "1">&ensp;'+quiz.options[qno-1][0]+'</label><br>'
        form += '<input type="radio" id = "2" value="'+quiz.options[qno-1][1]+'"><label for = "2">&ensp;'+quiz.options[qno-1][1]+'</label><br>'
        form += '<input type="radio" id = "3" value="'+quiz.options[qno-1][2]+'"><label for = "3">&ensp;'+quiz.options[qno-1][2]+'</label><br>'
        form += '<input type="radio" id = "4" value="'+quiz.options[qno-1][3]+'"><label for = "4">&ensp;'+quiz.options[qno-1][3]+'</label><br>'
        form += '<input type="radio" id = "5" value="'+quiz.options[qno-1][4]+'"><label for = "5">&ensp;'+quiz.options[qno-1][4]+'</label><br>'
        $("#options").append(form)

        let button = '<button id = "submit" class = "center" > Submit </button>'
        $("#submit_button").append(button)
        let next = parseInt(qno)
        next += 1
        console.log(next)
        $("#submit").click(function() {
            $("#submit_button").css('visibility', 'hidden')
            let button = '<button id = "next" class = "center" > Next </button>'
            console.log(document.getElementById('1').checked)
            $("#next_button").append(button)
            let data_to_save = {"1": document.getElementById('1').checked,
                                "2": document.getElementById('2').checked,
                                "3": document.getElementById('3').checked,
                                "4": document.getElementById('4').checked,
                                "5": document.getElementById('5').checked,
                                "qno": qno,
                                "quiz": quiz}
            console.log(data_to_save)
            $.ajax({
                type: "POST",
                url: "check_answer",                
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(data_to_save),
                success: function(result){
                    let correct = result["correct"]
                    alert(correct)
                    if(correct){
                        $("#feedback").value("Correct!")
                    }
                    else{
                        $("#feedback").value("Incorrect!")
                    }
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            })
            $("#next").click(function(){
                window.location.replace("http://127.0.0.1:5000/quiz/"+quiz.id+"/"+next);
            })
        })
})