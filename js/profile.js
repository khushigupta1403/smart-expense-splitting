let user =
JSON.parse(localStorage.getItem("evenUser")) ||
{
name:"Khushi Gupta",
email:"khushi@email.com",
phone:"9876543210",
image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
};





function loadProfile(){


document.getElementById("name").value=user.name;

document.getElementById("email").value=user.email;

document.getElementById("phone").value=user.phone;


document.getElementById("displayName")
.innerHTML=user.name;


document.getElementById("displayEmail")
.innerHTML=user.email;



document.getElementById("profileImage")
.src=user.image;


}




function saveProfile(){


user.name=
document.getElementById("name").value;


user.email=
document.getElementById("email").value;


user.phone=
document.getElementById("phone").value;



localStorage.setItem(
"evenUser",
JSON.stringify(user)
);



loadProfile();


alert("Profile Updated Successfully");


}






function uploadImage(){


let file =
document.getElementById("imageUpload")
.files[0];



if(file){


let reader =
new FileReader();



reader.onload=function(e){


user.image=e.target.result;


localStorage.setItem(
"evenUser",
JSON.stringify(user)
);


loadProfile();


}



reader.readAsDataURL(file);


}


}






function changePassword(){


let pass =
document.getElementById("newPassword").value;



if(pass.length<6){

alert("Password must be 6 characters");

return;

}


alert("Password Changed Successfully");


}




loadProfile();