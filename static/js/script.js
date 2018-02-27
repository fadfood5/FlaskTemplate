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
        tempuser = localStorage.getItem('userdata');
        let parseduser;
        if (tempuser) {
            parseduser = JSON.parse(tempuser);
            let email = parseduser.email;
            console.log(email)
            $.ajax({
                url: '/getEvents',
                data: {
                    temp: email
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    localStorage.setItem('userevents', JSON.stringify(response.events))
                    response.events.forEach(function(val){
                        $('#eventTableBody').append("<tr><td>" + val.eventName + "</td><td>" + val.eventTime + "</td><td>" + val.eventUrl + "</td></tr>")
                    })
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
});