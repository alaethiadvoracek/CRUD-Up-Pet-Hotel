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

function updateKoala() {

    let name = $('#petName').val()
    let breed = $('#breed').val()
    let color = $('#color').val()

    if (checkInputs(name, breed, color)) {
        let petId = $(this).val();
        console.log(Id);
        let objectToUpdate = {
            name: name,
            breed: breed,
            color: color
            
        };
        $.ajax({
            type: 'PUT',
            url: '/pets/update/' + koalaId,
            data: objectToUpdate,
            success: function (response) {
                console.log('response', response);
                getKoalas();
                $('#tableBody').empty();

                $('#name').val('');
                $('#breed').val('');
                $('#color').val('');
            }
        });
    }
}


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
