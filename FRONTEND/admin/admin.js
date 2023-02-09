const token=localStorage.getItem('token');
window.addEventListener("DOMContentLoaded",(event) =>{
getUserList();
})

async function creategroup(event){
    event.preventDefault();
    try {
        let gname=document.getElementById('gname').value;
       
        let groupname={gname};
        console.log(groupname);
        const response = await axios.post("http://localhost:3000/creategroup",groupname,{headers:{"Authorization":token}})
        console.log(response);
        console.log(response.data);
        if(response.status===201){
            alert(response.data.message)
            window.location='../ChatScreen/chat.html'
            
        }
    } catch (error) {
        console.log(error);
        document.body.innerHTML+= `<div style="color:red;">${error.message}</div>`;
    }
}

async function getUserList(){
    const response= await axios.get("http://localhost:3000/getuserlist",{headers:{"Authorization":token}} )
    console.log(response);
    if(response.status===200){
        console.log(response);
          let groups=document.getElementById('groups');
          groups.innerHTML+=`  ${response.data.name} <button> Invite </button><br>`
          if(groups.style.display == 'none'){
            groups.style.display = 'block';
        }

       
    }
    }
    

