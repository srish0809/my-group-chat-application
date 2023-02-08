 async function login(event){
    try{
    event.preventDefault();
 const email=document.getElementById('email').value;
 const password=document.getElementById('password').value;

 const loginDetails={
    email,password
 }
 console.log(loginDetails);
const response=await axios.post("http://localhost:3000/login",loginDetails)
if(response.status===200){
    alert(response.data.message)

    localStorage.setItem('token',response.data.token)
      window.location = '../admin/admin.html';
}
else{
    throw new Error("Failed to Login")
}


    }
    catch(error){
           document.body.innerHTML+=`<div style="color:red">${error.message}</div>`;
        alert(error.message)
    }
}