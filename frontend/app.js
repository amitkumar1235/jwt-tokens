console.log("linked");
var flag = false;

async function func() {
  const name = document.getElementById("Name").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  var x = document.getElementById("emailHelp").value;
  console.log(x);
  console.log(name);
  console.log(`email = ${email}`);
  console.log(`password : ${password} `);
  try {
    const res = await axios.post("http://localhost:3000/api/user/register", {
      name: name,
      email: email,
      password: password
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

// document.getElementById("form").addEventListener("submit", (e)=>{
//     const name = document.getElementById("Name").value ;
//     const email = document.getElementById("Email").value ;
//     const password = document.getElementById("Password").value ;
//     var x = document.getElementById("emailHelp").value ;
//     console.log(x) ;
//     console.log(name) ;
//     console.log(`email = ${email}`) ;
//     console.log(`password : secure `) ;

//     e.preventDefault();
// })
