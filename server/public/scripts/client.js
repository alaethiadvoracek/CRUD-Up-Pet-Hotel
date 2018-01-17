$(document).ready(start);

function start() {
    console.log('jq sourced');

    $('#registerOwner').on('click', registerOwner);
    $('#deletePet').on('click', deletePet);
    $('#registerPet').on('click', registerNewPet);
    getOwnersNames();
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
            getOwnersNames();
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
        owner: $('#ownerSelect').children(':selected').data('id')
    }
    
    //POST call to server with data object
    $.ajax({
        method: 'POST',
        url: '/hotel/registerPet',
        data: pet,
        success: (response)=>{
            console.log('POST register pet successful: ', response);
            
            //Need to call GetAllData function here in order to update the table.
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
            console.log('GET /hotel getOwnersNames', response);
            updateDropdown(response);
        },
        error: function(err) {
            console.log('err in getOwnersNames', err);
        }
    });
}
function updateDropdown(ownersNames) {
    console.log('hey this is updateDropdown()', ownersNames);
    let dropdown = $('#ownerSelect');
    for (let i = 0; i < ownersNames.length; i++) {
        let newOption = $(`<option value="hi">${ownersNames[i].first_name} ${ownersNames[i].last_name}</option>`);
        newOption.data(ownersNames[i]);
        dropdown.append(newOption);
    }
}
function updateTable (ownerPetArray) {
    console.log('owner pet array in displayOwnersPets', ownerPetArray);
    let $row;
    for(let i = 0; i < ownerPetArray.length; i++) {
        $row = $('<tr></tr>');
        let fname = ownerPetArray[i].first_name;
        let lname = ownerPetArray[i].last_name;
        $row.append(`<td>${fname} ${lname}</td>`);
    }
    $('#tableBody').append($row);
}


