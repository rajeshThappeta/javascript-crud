let users = [];
let setEdit = false;
async function getUsers() {
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await res.json();

  displayUsers();
}

let tbody = document.querySelector("tbody");

function displayUsers(id) {
  tbody.innerHTML = null;
  let tr;
  users.forEach((user, index) => {
    id != user.id || setEdit==false
      ? (tbody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick='deleteUserById(${user.id})'>x</button>
                <button onclick='editUserById(${user.id})'>edit</button>
            </td>
        </tr>`)
      : (tbody.innerHTML += `<tr>
      
        <td>
            <input type='text' value=${user.id}  disabled/>
            </td>
            <td>
            <input type='text' value="${user.name}" id="name" />
            </td>
            <td>
            <input type='text' value=${user.username} id="username" />
            </td>
            <td>
            <input type='text' value=${user.email} id="email" />
            </td>
            <td>
                <button onclick='saveUserById(${user.id},${index})'>Save</button>
            </td>
        </tr> `);
  });
}

function deleteUserById(id) {
  users = users.filter((user) => user.id !== id);
  displayUsers();
}

function editUserById(id) {
    setEdit=true;
  displayUsers(id);
}

function saveUserById(id,index) {

    let name=document.querySelector("#name").value;
    let username=document.querySelector("#username").value;
    let email=document.querySelector("#email").value;
   users.splice(index,1,{id,name,username,email})
  setEdit=false;
  displayUsers(id);
}



getUsers();
