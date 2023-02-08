let token=localStorage.getItem('token')
async function resetpassword(event){
    event.preventDefault();
try {
    const email=document.getElementById('email').value;
    const resetDetails={email};

    const response=await axios.post('http://localhost/password/resetpassword',resetDetails,{headers:{"Authorization":token}})
        if(response.status===201){
       console.log(response);
       alert('Done!')
        }
    else{
        throw new Error('Failed to reset Password');
    }

} catch (error) {
    console.log(error);
}
}