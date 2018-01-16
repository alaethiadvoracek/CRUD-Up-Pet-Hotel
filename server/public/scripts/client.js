$(document).ready(start);

function start() {
    console.log('jq sourced');

    $('#registerOwner').on('click', registerOwner);
}

function registerOwner(event) {
    event.preventDefault();
    const data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val()
    };
    $.ajax({
        type: 'POST',
        url: '/hotel',
        data: data,
        success: function(response) {
            console.log('got register owner', response);
        },
        error: function(err) {
            console.log('error in register owner', err);
        }
    });
}