console.log("js file connected")

let submitButton = document.getElementById('submit-button');

console.log(submitButton)

submitButton.addEventListener('click', async () => {
    //send a request to Express
    //result id the response from the server

    //this capture the value from our javascript
    let priceNumber = +document.getElementById('price-input').value;
    let invNumber = +document.getElementById('inv-amt-input').value;
    let delivDateString = document.getElementById('delivery-date-input').value;
    let delivAmtNumber = +document.getElementById('delivery-amt-input').value;
    let nameString = document.getElementById('name-input').value;

    //this is the data on the front end, we need to send to our server, so our server can send it to our database
    const itemObject = {
    priceNumber,
    invNumber,
    delivDateString,
    delivAmtNumber,
    nameString
}

    console.log(JSON.stringify(itemObject))

    //post request because we are adding an item
    //create funtion and await response

let response = await fetch('http://localhost:5000/create_inventory', { //1st paramenter the URL, 2nd paramenter ID from our server 
    method: "POST",
    headers: {
     'Content-Type': 'application/json', //let it know we are sending json to the database
    }, 
    body: JSON.stringify(itemObject) //stringify js value to json 
})
console.log(response);

let uploadStatusTag = document.getElementById('upload-status');
    //create a conditional to show item updated correctly
    if (response.status === 200) {
        console.log(response);
        console.log("upload complete!!!");
        uploadStatusTag.textContent = "Upload Completed";
        uploadStatusTag.style.color = "green";

    } else {
        console.log(response);
        console.log("upload failed");
        console.log;
        uploadStatusTag.textContent = "Upload Failed";
        uploadStatusTag.style.color = "red";

    }

})

//add function to go to display item
document.getElementById('display-inventory').addEventListener('click', () => {
    window.location.href = '/display_items'
})