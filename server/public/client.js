console.log('client.js is loaded');



$(document).ready(onReady);

function onReady(){
    console.log('jQuery is ready');
    //NEEDED A DESCENDENT SELECTOR
    $('#restaurantBody').on('click', '.deleteButton', handleDeleteClick);
    $('#restaurantBody').on('click', '.saveButton', handleSaveClick);
    $('#submitButton').on('click', handleSubmitClick);

    appendTable()
}



function handleSubmitClick() {
    console.log('Submitting!');

    $.ajax({
        method: "POST",
        url: "/new",
        data: {
            name: $('#restaurantNameIn').val(),
            type: $('#restaurantTypeIn').val(),
            rating: $('#restaurantRatingIn').val()
        }
    }).then(function() {  
        $.ajax({
        type: 'GET',
        url: '/restaurants'
        })
        .then(function (response) {
            //$('#outputDiv').empty();
                console.log(response);
                
                appendTable(response);
            $('#restaurantNameIn').val('');
            $('#restaurantTypeIn').val('');
            $('#restaurantRatingIn').val('');
        }
        )
        
    })

}

 // $(this).data().index
// url: '/restaurants/' + $(this).data.id;

function handleDeleteClick() {
    console.log('Deleteing:', $(this).data('index'));
    $.ajax({
        method: "DELETE",
        url: "/restaurants",
        data: {index: $(this).data('index')}
    }).then(function(response){
         //update dom
        appendTable();
        console.log('back form DELETE with:', response);
        
    }).catch( function( error ){
        console.log('error with DELETE:', error);
    })
}

function handleSaveClick() {
    console.log('Saving!');
    $.ajax({
        method: "PUT",
        url: "/restaurants",
        data: {index: $(this).data('index')}
    }).then(function(response){
         //update dom
        appendTable();
        console.log('back form SAVE with:', response);
        
    }).catch( function( error ){
        console.log('error with SAVE:', error);
    })
       
}

function appendTable() {
    $.ajax({

        url: '/restaurants',
        method: 'GET'

    }).then(function(response) {
        console.log('requesting restaurants');

        console.log(response);
        $('#restaurantBody').empty();
        response.forEach(function(restaurant){   

            $('#restaurantBody').append(
        
                `<tr>
                    <td>${restaurant.name}</td>
                    <td>${restaurant.type}</td>
                    <td>${restaurant.rating}</td>   
                    <td><button class="deleteButton" data-index="${restaurant.id}" >Delete</button></td>
                    <td><button class="saveButton" data-index="${restaurant.id}" >Save</button></td>
                </tr>`
            )
        });
    })
}