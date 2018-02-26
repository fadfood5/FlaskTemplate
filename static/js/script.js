$(document).ready(function(){
    $('#homeComponent').hide();
    $('#Login').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#formLogin').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    $('#loginComponent').hide();
                    $('#homeComponent').show();
                    populateUser();
                    getTable();
                }else{
                    $('#errorMessageLogin').text('Incorrect email and/or password.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('#Register').on('click', function() {
        $.ajax({
            url: '/register',
            data: $('#formRegister').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.registered === true){
                    $('#myForm').trigger("reset");
                    $('#errorMessageReg').text('Registration successful!')
                }else{
                    $('#errorMessageReg').text('Registration failed. Try again.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    function populateUser(){
        let user = JSON.parse(localStorage.getItem('userdata'));
        console.log(user)
        $('#greeting').append(user.firstName)
    }

    function getTable(){
        console.log(localStorage.getItem('userdata'));
        $.ajax({
            url: '/getEvents',
            data: {
                user: localStorage.getItem('userdata').email,
                temp: 123
            },
            type: 'GET',
            success: function(response) {
                console.log(response);
                localStorage.getItem('userevents', JSON.stringify(response.events))
                response.events.forEach(function(val){
                    $('#eventTableBody').append("<tr><td>" + val.eventName + "</td><td>" + val.eventTime + "</td><td>" + val.eventUrl + "</td></tr>")
                })
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});