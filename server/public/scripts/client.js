$(document).ready(start);

function start() {
    console.log('jq sourced');

    $('#registerOwner').on('click', registerOwner);    
    $('#registerPet').on('click', registerNewPet);    
    $('#deletePet').on('click', deletePet);

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
            url: '/hotel/update/' + petId,
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
        }
    });
  } // end deletePet()



  /*****************
    Register New Pet
   *****************/

function registerNewPet(event){
   //stop form from refreshing the page
   event.preventDefault();
   //create data object to send to server.
    let pet = {
        name: $('#petName').val(),
        breed: $('#breed').val(),
        color: $('#color').val(),
        owner: 1
    }

    console.log('new pet object: ', pet);
    //POST call to server with data object
    $.ajax({
        method: 'POST',
        url: '/hotel/registerPet',
        data: pet,
        success: (response)=>{
            console.log('POST register pet: ', response);
        }
    });
}// end registerNewPet

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
function displayOwnersPets(ownerPetArray) {
    let $row = $('<tr></tr>');
    for(let i = 0; i < ownerPetArray.length; i++) {
        let fname = ownerPetArray[i].first_name;
        let lname = ownerPetArray[i].last_name;
        $row.append(`<td>${fname} ${lname}</td>`);
        $('#tableBody').append($row);
    }
}


