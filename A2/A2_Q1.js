let btn = document.querySelector('button');
let main = document.querySelector('main');

btn.addEventListener('click', function(){

    axios.get('https://randomuser.me/api/?results=3&gender=female')
        
    .then(function(response){

        for (let i=0; i < 3 ; i++) {
        
            //to create a big container that group every three little container
            if (i%3==0) { 
                var bigContainer = document.createElement("div");
                bigContainer.setAttribute("class", "bigContainer");
                main.appendChild(bigContainer);
                
            };   
                
            let firstName = response.data.results[i].name.first;
            let lastName = response.data.results[i].name.last;
            let name = firstName + " " + lastName;
            let email = response.data.results[i].email;
            let photo = response.data.results[i].picture.large;
             

               
            //create an div to be a container that carries the name, img, and email
            let containerDiv = document.createElement("div");
            containerDiv.setAttribute("class", "container");
                

            let nameDiv = document.createElement("div");
            nameDiv.setAttribute("class", "name");
            nameDiv.innerText= name;

            let imgTag = document.createElement("img");
            imgTag.setAttribute("class", "photoDiv");
            imgTag.setAttribute("src", photo);
                    
        

            let emailDiv = document.createElement("div");
            emailDiv.setAttribute("class", "email");
            emailDiv.innerText = email;

                
            containerDiv.appendChild(nameDiv);
            containerDiv.appendChild(imgTag);
            containerDiv.appendChild(emailDiv);

                
            if (i%3==0) {
                bigContainer.appendChild(containerDiv);
            }else {
                bigContainer.appendChild(containerDiv);
            };
        
        }

    })
    .catch(function(error){
            console.log(error);
    });
})
