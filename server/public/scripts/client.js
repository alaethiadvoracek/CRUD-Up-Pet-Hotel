$(document).ready(start);

function start() {
    console.log('jq sourced');
    $('#registerOwner').on('click', registerOwner);
    $('#deletePet').on('click', deletePet);
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
            // TODO: Get list of owners again
            getOwnersNames(response);
        },
        error: function(err) {
            console.log('error in register owner', err);
        }
    });
}

//edit pet values
function editPet() {

    let editDiv = $('#tableBody');
    let petId = $(this).val().parents().id;

    $.ajax({
        url: '/pets/' + petId,
        method: 'GET',
        success: function (response) {
            console.log('got one Koala:', petId, response);

            $('#name').val(response[0].name).focus();
            $('#breed').val(response[0].breed);
            $('#color').val(response[0].color);
            $('#addButton').val(response[0].id);
        }
    });

}


// function to delete pet from table and database
function deletePet() {
    let petId = $(this).parents('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: '/hotel/' + petId,
        success: function(response){
            console.log('pet deleted:', response);
        }
    });
  } // end deletePet()

// display owners and pets with edit, delete, and checkin info.
// get owners names
function getOwnersNames () {
    $.ajax({
        method: "GET",
        url: "/hotel",
        success: function (response) {
            $('#tableBody').empty();
            displayOwnersPets(response);
        }
    })
}
function displayOwnersPets (ownerPetArray) {
    let $row = $('<tr></tr>');
    for(let i = 0; i < ownerPetArray.length; i++) {
        let fname = ownerPetArray[i].first_name;
        let lname = ownerPetArray[i].last_name;
        $row.append(`<td>${fname} ${lname}</td>`);
        $('#tableBody').append($row);
    }
}

