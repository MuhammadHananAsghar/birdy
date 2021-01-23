// DECALRING GLOBAL VARIABLE
var currentUserKey = '';


// LOG IN
function SignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

// AFTER LOG IN AUTHENTICATION
function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
}

// AFTER LOG IN WORK DOING
function onStateChanged(user) {
    if (user) {

        // PUTTING USER DATA IN DB
        var userProfile = { email: '', name: '', photo: '', date: ''};
        var DATE = new Date().toLocaleString();
        userProfile.email = firebase.auth().currentUser.email;
        userProfile.name = firebase.auth().currentUser.displayName;
        userProfile.photo = firebase.auth().currentUser.photoURL;
        userProfile.date = DATE;

        var db = firebase.database().ref('users');
        var flag = false;

        db.on('value', function(users) {
            users.forEach(function(data) {
                var user = data.val();
                if (user.email === userProfile.email) {
                    currentUserKey = data.key;
                    flag = true;
                }
            });
            if (flag === false) {
                firebase.database().ref('users').push(userProfile, callback);
            } else {
                return false;
            }
        });



        document.getElementById("LOGIN").style.display = "none";
        document.getElementById("CHATLIST").style.display = "block";
        document.getElementById("CHATSECTION").style.display = "block";
        document.getElementById("USERLIST").style.display = "block";
        document.getElementById("USRIMAGE").src = firebase.auth().currentUser.photoURL;
        document.getElementById("USRIMAGE").alt = firebase.auth().currentUser.displayName;
        const name = firebase.auth().currentUser.displayName.split(" ");
        document.getElementById('USERNAME').textContent = name[0];
        document.getElementById("RECENTUSERS").innerHTML = "";
        LoadChatList();
    } else {
      document.getElementById("LOGIN").style.display = "flex";
      document.getElementById("CHATLIST").style.display = "none";
      document.getElementById("CHATSECTION").style.display = "none";
      document.getElementById("USERLIST").style.display = "none";
      document.getElementById("USRIMAGE").src = "";
      document.getElementById("USRIMAGE").alt = "";
      document.getElementById('USERNAME').textContent = "";
    }
}

// Sign Out
function SignOut() {
    document.getElementById("LOGIN").style.display = "flex";
    document.getElementById("CHATLIST").style.display = "none";
    document.getElementById("CHATSECTION").style.display = "none";
    document.getElementById("USERLIST").style.display = "none";
    firebase.auth().signOut();
}


// Callback ERROS
function callback(error) {
    if (error) {
        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");
        setTimeout(function() {
            $('.alert').removeClass("show");
            $('.alert').addClass("hide");
        }, 5000);
    } else {}
}


// CALLING ACTION
onFirebaseStateChanged();
