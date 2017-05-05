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

                $("button").button("option", "disabled", false);
                $("#login").button("option", "disabled", true);
                showUserDetails();
            }
        },
            (error) => {

                // Well, not so
            });
    });

    $("#showfriends").click(() => {

        emptyAndHideAll();
        showFriends();
    });
});

function showFriends() {

    FB.api(
        'me/friends', (list) => {
            console.log(list);
        }
    )
}

function emptyAndHideAll() {

    // Possible refactoring detected :)
    $("#details").empty().hide();
    $("#friends").empty().hide();
    $("#likes").empty().hide();
}

function showUserDetails() {

    FB.api(
        '/me',
        'GET',
        { "fields": "hometown,birthday,name" },
        function (response) {

            // Insert your code here
            if (response) {
                console.log(response);
                let html =
                    `<div id="pic">
                        <img src="http://graph.facebook.com/${response.id}/picture/">
                    </div>`;

                $('#user').empty().html(html).show();
            }
        }
    );
}