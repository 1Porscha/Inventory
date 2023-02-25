console.log("Display Page")

let container = document.getElementById('container');

//make request to display all items
//create a display funtion and await response
const displayData = async () => {
    let data = await fetch('http://localhost:5000/get_inventory_data');
    data.json().then((parsedData) => {
        console.log(parsedData);

        //create PTag, map through data and for each item add to screen through html
        parsedData.forEach((object) => {
            let pTag = document.createElement("p");
            pTag.textContent = object.name;
            container.appendChild(pTag);
        })
    })
}

displayData()