function triggerAside(){
  let NavBar = document.getElementById('USERLIST');
  NavBar.classList.toggle('active');
  let Trigger = document.getElementById('NavTrigger');
  Trigger.classList.toggle('activeNav');
  let Area = document.getElementById('Area');
  Area.classList.toggle('activeArea');
  PopulateAllUsersFoundedInDatabase();
}


function PopulateAllUsersFoundedInDatabase() {
  document.getElementById('loader').style.display = "block";
    var db = firebase.database().ref('users');
    var lst = '';
    document.getElementById("ALLUSERSID").innerHTML = "";
    db.on('value', function(users) {
        users.forEach(function(data) {
            var user = data.val();
            if (user.email === firebase.auth().currentUser.email) {} else {
                lst += `<li>
                  <div class="listUserItem">
                    <div class="one">
                      <img src="${user.photo}" alt="${user.name}">
                      <div>
                        <h4>${user.name}</h4>
                      </div>
                    </div>
                    <div class="two">
                      <div class="buttonChat" onclick="StartChat('${data.key}', '${user.name}','${user.photo}')">
                        Chat
                      </div>
                    </div>
                  </div>
                </li>`;
            }
        });
        document.getElementById('loader').style.display = "none";
        document.getElementById("ALLUSERSID").innerHTML += lst;
    });

}
