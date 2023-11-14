const login = async function (){

    let url = "https://tps2311ft-proyecto03.onrender.com";

    let data = {
        password: document.getElementById("passwordUser_id").value, 
        nickname: document.getElementById("emailUser_id").value
    }

    await fetch(`${url}/login`,{
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)})
    .then((response)=> response.json())
    .then ((data)=> {
        if(data.status != "Error"){
            
            document.getElementById("emailUser_id").value = "";
            document.getElementById("passwordUser_id").value = "";
            localStorage.setItem("dataUserStorage", JSON.stringify(data.data))
            location.href = "/home";
        }else{
            alert(data.message);
        }
    })
}