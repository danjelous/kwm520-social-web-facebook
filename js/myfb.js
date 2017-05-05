'use strict';

$(document).ready(() => {

    console.log("Ready to go");

    // Button styling, lol
    $("button").button();

    // Setup when click on login
    $("#login").click(() => {

        FB.login((response) => {

            // Login successfull
            if (response.authResponse) {

                showUserDetails();
            }
        },
            (error) => {

                // Well, not so
            });
    });
});

function showUserDetails() {

    FB.api(
        '/me',
        'GET',
        { "fields": "hometown,birthday,name" },
        function (response) {

            // Insert your code here
            if(response) {
                let html = '<div id="pic"><img src="http://graph.facebook.com/' + response.id + '/picture/"></div>'; 

                $('#user').empty().html(html).show();
            }
        }
    );
}