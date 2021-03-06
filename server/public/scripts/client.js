$(document).ready(start);

function start() {
    console.log('jq sourced');
    getAllData();
    getOwnersNames();
    $('#registerOwner').on('click', registerOwner);
    $('#deletePet').on('click', deletePet);
    $('#registerPet').on('click', registerNewPet);
    $('#editPet').on('click', '.tableBody', editPet);
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

    $('#firstName').val('').focus();//empty input return focus
    $('#lastName').val('');//empty input
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
            getAllData();
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

function getAllData () {
    $.ajax({
        method: 'GET',
        url: '/hotel/collectData',
        success: function (response) {
            console.log('get all data function response: ', response);
            $('#tableBody').empty();
            updateTable(response);
        }
    })
}
function updateTable (ownerPetArray) {
    console.log('owner pet array in displayOwnersPets', ownerPetArray);
    let $row;
    for(let i = 0; i < ownerPetArray.length; i++) {
        $row = $('<tr></tr>');
        let fname = ownerPetArray[i].first_name;
        let lname = ownerPetArray[i].last_name;
        let deleteButton = '<button type="button" class="btn btn-danger petDelete">Remove Pet</button>';
        $row.append(`
        <td>${fname} ${lname}</td>
        <td>${ownerPetArray[i].name}</td>
        <td>${ownerPetArray[i].breed}</td>
        <td>${ownerPetArray[i].color}</td>
        <td>${deleteButton}</td>
        `);
        $('#tableBody').append($row);
    }
}


