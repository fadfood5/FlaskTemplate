$(document).ready(function(){
    $('#Login').click(function() {
        let user = $('#email').val();
        let pass = $('#pass').val();
        console.log(user, pass)
        $.ajax({
            url: '/login',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth == 1)
                    localStorage.setItem('userdata', response.user);
                    $('#loginComponent').hide();
                    $('#homeComponent').show();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});