$(document).ready(start);

function start() {
    console.log('jq sourced');

    $('#registerOwner').on('click', registerOwner);
    
    $('#registerPet').on('click', registerNewPet);
    
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
        owner: 
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