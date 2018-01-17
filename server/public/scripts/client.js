$(document).ready(start);

function start() {
    console.log('jq sourced');

    $('#registerOwner').on('click', registerOwner);
    $()
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
        },
        error: function(err) {
            console.log('error in register owner', err);
        }
    });
}

//edit pet values
function updatePet() {

    //get values from inputs
    let name = $('#petName').val()
    let breed = $('#breed').val()
    let color = $('#color').val()

    if (checkInputs(name, breed, color)) {
        let petId = $(this).val();
        console.log(petId);
        let objectToUpdate = {
            name: name,
            breed: breed,
            color: color
        };

        $.ajax({
            type: 'PUT',
            url: '/pets/update/' + petId,
            data: objectToUpdate,
            success: function (response) {
                console.log('response', response);
                getPets();
                $('#tableBody').empty();

                $('#name').val('');
                $('#breed').val('');
                $('#color').val('');
            }
        });//end pet ajax 'PUT'
    }
}//end update pets


// function to delete pet from table and database
function deletePet() {
    let petId = $(this).parents('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: '/hotel/' + petId,
        success: function(response){
            console.log('pet deleted:', response);
            displayOwnersPets();
        }
    });
  } // end deletePet()
