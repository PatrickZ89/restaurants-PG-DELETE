console.log('client.js is loaded');



$(document).ready(onReady);

function onReady(){
    console.log('jQuery is ready');
    //NEEDED A DESCENDENT SELECTOR
    $('#restaurantBody').on('click', '.deleteButton', handleDeleteClick);
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
        }
    }).then(function() {  
        $.ajax({
        type: 'GET',
        url: '/restaurants'
        })
        .then(function (response) {
            //$('#outputDiv').empty();
                console.log(response);
                
                appendTable(response)
            
        }
        )
    })

}


function handleDeleteClick() {
    console.log('Deleteing!');
    $.ajax({
        method: "DELETE",
        url: "/restaurants",
        data: {index: $(this).data('index')}
    }).then(function(response){
        console.log('back form DELETE with:', response);
        //update dom
        appendTable();
    }).catch( function( error ){
        console.log('error with DELETE:', error);
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
                    <td><button class="deleteButton" data-index="${restaurant.id}" >Delete</button></td>
                </tr>`
            )
        });
    })
}