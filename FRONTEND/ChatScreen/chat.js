 const token=localStorage.getItem('token');
 const messageList=document.getElementById('chat')
 let users= document.getElementById('users');


 function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function sendMessage(event){
    event.preventDefault();
          let message=document.getElementById('message').value;
        let obj={message}
        console.log(obj);
                 try {
                const response= await axios.post("http://localhost:3000/groupmessage/send-message", obj ,{headers:{"Authorization":token}})
                messageList.innerHTML='';
               getMessage();
            } catch (error) {
                document.body.innerHTML += "<h4>Something went wrong !</h4>";
                console.log(error);
            }
           

         
        }
        

async function getMessage()
{
    try{
    let oldMessages = [];
    let lastMsgId = 0;
    if (localStorage.getItem('message')) {
        if (JSON.parse(localStorage.getItem('message')).length !== 0) {
            oldMessages = JSON.parse(localStorage.getItem('message'));
            lastMsgId = oldMessages[oldMessages.length - 1];
        }
    }
    messageList.innerHTML='';
  const response= await axios.get(`http://localhost:3000/groupmessage/get-message?lastMsgId=${lastMsgId}`,{headers:{'Authorization':token}})
 // console.log(response);
 if (response.status === 200) {
    const newMessages = response.data.message;
      let messages = newMessages;
     // console.log(oldMessages);
      //console.log(newMessages);
    if (oldMessages.length > 0) {
        messages = [...oldMessages, ...newMessages];
        console.log(messages);
        
    }
   
    ShowMessagesOnScreen(messages);
    
    

      
       const numOfMsgs = messages.length;
       console.log(numOfMsgs);
       const latestTenMsgs = [];
       if (numOfMsgs < 10) {
           for (let i = 0; i < numOfMsgs; i++) {
               latestTenMsgs.push(messages[i]);
           }
       } else {
           for (let i = numOfMsgs - 10; i < numOfMsgs; i++) {
               latestTenMsgs.push(messages[i]);
           }
       }
       localStorage.setItem('message', JSON.stringify(latestTenMsgs));
    } 
    else {
        throw new Error('Something went wrong. Please try again.');
    }
}
catch (error) {
console.log(error);
}
};



window.addEventListener("DOMContentLoaded",()=>{
    
    getMessage();
   
})

function ShowMessagesOnScreen(messages){
    

    // const messageElement=document.createElement('div');
    // messageElement.innerText=`${name}: ${message.message}`;
    // messageContainer.appendChild(messageElement)
    
for(let message of messages)
{
    
    messageList.innerHTML+=`<li>${message.name}: ${message.message}</li>`;
    
}

   
}


document.getElementById('logout-button').addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.clear();
    window.location.href='../login/login.html';
})