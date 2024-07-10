const API_URL = "https://dummyapi.io/data/v1/user/"; //Base URL
const appId = "667a4d799e133752142431fd";
let loadedData = null;

// ! User List
// Sid Loading and Showing Fetched in the table
showUserList();

function showUserList() {
  var tableBody = document.getElementById("table-body");

  axios
    .get(`${API_URL}?page=1&limit=10`, {
      headers: { "app-id": "667a4d799e133752142431fd" },
    })
    .then((result) => {
      loadedData = result.data.data;

      result.data.data.forEach((element) => {
        var tablerow = document.createElement("tr");
        tablerow.classList.add("rowdata");
        id = element.id;
        tablerow.setAttribute("id", `${element.id}`);
        
        tablerow.addEventListener('click', (event) => {
          if (!event.target.closest('td#delete')) {
            updateUserDisplay(element.id);
          }
        });

        tablerow.innerHTML = `
            <td><img src=${element.picture} alt="" width="50" height="50"/> </td>
            <td>${element.firstName.slice(0, 9)}</td>
            <td>${element.lastName}</td>
            <td id="delete"><button onclick="deleteFunction('${element.id}', event)"><i class="fa-solid fa-trash-can 2xl"></i></button>
            </td>
            `;
        tableBody.append(tablerow);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Note: Get User Function
const getUserData = (id) => {
  var tableBody = document.getElementById("search-table-body");
  var tablerow = document.createElement("tr");
  tablerow.classList.add("searchTable-row");

  axios
    .get(`${API_URL}${id}`, {
      headers: { "app-id": appId },
    })
    .then((result) => {
      const element = result.data;

      tablerow.innerHTML = `
            <td><img src='${element.picture}' alt="" width="50" height="50"/> </td>
            <td>${element.firstName.slice(0, 9)}</td>
            <td>${element.lastName}</td>
            <td>${element.email}</td>
            `;
      tableBody.append(tablerow);
    })
    .catch((err) => {
      console.log(err);
    });
  var search = document.getElementById("search");
  search.value = "";
};

// Note: Update Function
function updateUserData(id, firstname, lastname, avatar) {
  axios
    .put(
      `${API_URL}${id}`,
      {
        firstName: firstname,
        lastName: lastname,
        picture: avatar,
      },
      {
        headers: { "app-id": appId },
      }
    )
    .then((result) => {
      console.log(result.data);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Note: Create Function
function createFunction(firstName, lastname, picture, email) {
  axios
    .post(
      `${API_URL}create`,
      {
        firstName: firstName,
        lastName: lastname,
        picture: picture,
        email: email,
      },
      {
        headers: { "app-id": appId },
      }
    )
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Note : Delete Function
function deleteFunction(id, event) {
  event.stopPropagation(); // Prevent the event from bubbling up to the row click event
  
  var deleteRow = document.getElementById(id);
  deleteRow.remove();
  axios
    .delete(`${API_URL}${id}`, {
      headers: { "app-id": appId },
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Sid : Displaying Update User section
function updateUserDisplay(id) {
  var updateForm = document.getElementById("update-user");
  var firstname = document.getElementById("firstname");
  var lastname = document.getElementById("lastname");
  var avatar = document.getElementById("avatar");
  var userId = document.getElementById("userId");
  var addUserForm = document.getElementById("add-user");

  if (addUserForm.style.display == "block") {
    addUserForm.style.display = "none";
    loadedData.forEach((data) => {
      if (data.id === id) {
        firstname.value = data.firstName;
        lastname.value = data.lastName;
        avatar.value = data.picture;
        userId.value = id;
      }
    });

    if (updateForm.style.display == "block") {
      updateForm.style.display = "none";
      userId.value = "";
    } else {
      updateForm.style.display = "block";
    }
  } else {
    loadedData.forEach((data) => {
      if (data.id === id) {
        firstname.value = data.firstName;
        lastname.value = data.lastName;
        avatar.value = data.picture;
        userId.value = id;
      }
    });

    if (updateForm.style.display == "block") {
      updateForm.style.display = "none";
      userId.value = "";
    } else {
      updateForm.style.display = "block";
    }
  }
}

// Note: Update the user when Submit
function updateSubmit() {
  let userId = document.getElementById("userId");
  let firstname = document.getElementById("firstname");
  let lastname = document.getElementById("lastname");
  let avatar = document.getElementById("avatar");

  updateUserData(userId.value, firstname.value, lastname.value, avatar.value);
}

//Sid : Add User Logic
function showAddUser() {
  var toogleAdd = document.getElementById("toogle-add");
  var addUserForm = document.getElementById("add-user");
  var updateUserForm = document.getElementById("update-user");

  if (updateUserForm.style.display == "block") {
    updateUserForm.style.display = "none";
    if (toogleAdd.value == "0") {
      addUserForm.style.display = "block";
      toogleAdd.value = "1";
    } else if (toogleAdd.value == "1") {
      addUserForm.style.display = "none";
      toogleAdd.value = "0";
    }
  } else {
    if (toogleAdd.value == "0") {
      addUserForm.style.display = "block";
    } else if (toogleAdd.value == "1") {
      addUserForm.style.display = "none";
      toogleAdd.value = "0";
    }
  }
}

function addUser() {
  var addfirstname = document.getElementById("add-firstname");
  var addlastname = document.getElementById("add-lastname");
  var addavatar = document.getElementById("add-avatar");
  var addemail = document.getElementById("add-email");

  var pattern = /\.jpg$/i;

  if (
    addfirstname.value == "" &&
    addlastname.value == "" &&
    addemail.value == "" &&
    addavatar.value == ""
  ) {
    alert("Please Fill All Details");
  } else if (addfirstname.value == "") {
    alert("Please Fill First Name");
  } else if (addlastname.value == "") {
    alert("Please Fill Last Name");
  } else if (addemail.value == "") {
    alert("Please provide valid email ");
  } else if (!pattern.test(addavatar.value)) {
    alert("Please enter valid image URL");
  } else {
    createFunction(
      addfirstname.value,
      addlastname.value,
      addavatar.value,
      addemail.value
    );
  }
}

function cancel() {
  document.getElementById("add-user").style.display = "none";
  document.getElementById("update-user").style.display = "none";
}

function searchUser() {
  var search = document.getElementById("search");
  if (search.value.length == 0) {
    if (search.style.display == "block") {
      search.style.display = "none";
    } else {
      search.style.display = "block";
    }
  } else {
    getUserData(search.value);
  }
}

function refreshform() {
  var tableBody = document.getElementById("table-body");
  var tablerow = document.querySelectorAll(".rowdata");

  tableBody.remove(tablerow);
}

// TODO : Form Validation(Html Side) -- Done
// TODO : Delete Operation -- Done
// TODO : Create Validation --Done
// TODO : Form Placement -- Done
// TODO : Add user Button dynamic behavior -- Done
// TODO : Add cancel Button  -- Done
// TODO : Add Refresh Button  -- Done
// TODO : Add Search Button / Show Searched User and its Functionality -- Done
