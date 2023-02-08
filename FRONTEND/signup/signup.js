async function SignUp(event){
    try{
    event.preventDefault();

    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let phn=document.getElementById('phn').value;

    const signupDetails={
        name,
        email,
        password,
        phn
    }
    console.log(signupDetails);

    const response=await axios.post('http://localhost:3000/signup', signupDetails)
    if(response.status===400){
        alert(response.data.message)
    }

   else if(response.status===201){
       alert(response.data.message)
       window.location = '../login/login.html';
       
    }
    
    else
    {
        throw new Error('Failed to SignUp')
        
    }

}
catch(error){
        document.body.innerHTML+= `<div style="color:red;">${error.message}</div>`;
    
  
  }
}
