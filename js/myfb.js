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

function showLikes(user) {

    if(user) {
        let html = user + " likes : <br>";
        FB.api('/' + user + '/likes', (likes) => {

            if(likes && likes.data) {
                for(let like in likes) {
                    html += likes.data[like].name + " - ";
                }
            }
        });

        $("#likes").empty().html(html).show();
    }
}

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
                let currentUser = response.id;
                let html =
                    `<div id="pic">
                        <img src="http://graph.facebook.com/${currentUser}/picture/">
                    </div>`;

                $('#user').empty().html(html).show();
                showLikes(currentUser);
            }
        }
    );
}