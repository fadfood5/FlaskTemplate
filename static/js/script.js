$(function() {
    $('button').click(function() {
        let user = $('#user').val();
        let pass = $('#pass').val();
        $.ajax({
            url: '/register',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});