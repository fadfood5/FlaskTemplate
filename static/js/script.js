$(document).ready(function(){
    $('#homeComponent').hide();
    $('#Login').on('click', function() {
        let user = $('#email').val();
        let pass = $('#pass').val();
        $.ajax({
            url: '/login',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    console.log("its true")
                    localStorage.setItem('userdata', response.user);
                    $('#loginComponent').hide();
                    $('#homeComponent').show();
                }else{
                    $('#errorMessage').text('Incorrect email and/or password.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});