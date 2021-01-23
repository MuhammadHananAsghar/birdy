var chatKey = '';
var li_data = '';
var user_name_chat = "";

// Add
function StartChat_a(key, name, photo) {
    document.getElementById('footer').style.display = 'block';
    var friendList = { friendID: key, userID: currentUserKey };

    var db = firebase.database().ref('connection_list');
    var flag = false;
    db.on("value", function(connections) {
        connections.forEach(function(data) {
            var user = data.val();
            if ((user.friendID === friendList.friendID && user.userID === friendList.userID) || (user.userID === friendList.friendID && user.friendID === friendList.userID)) {
                flag = true;
                chatKey = data.key;
            }

        });

        if (flag === false) {
            chatKey = firebase.database().ref('connection_list').push(friendList, function(error) {
                if (error) {
                } else {
                   location.reload();
                }
            }).getKey();
        } else {
           location.reload(); 
        }
    });
}
// WITH REGISTERED USERS
function StartChat(key, name, photo) {
    document.getElementById('footer').style.display = 'block';
    var friendList = { friendID: key, userID: currentUserKey };

    var db = firebase.database().ref('connection_list');
    var flag = false;
    db.on("value", function(connections) {
        connections.forEach(function(data) {
            var user = data.val();
            if ((user.friendID === friendList.friendID && user.userID === friendList.userID) || (user.userID === friendList.friendID && user.friendID === friendList.userID)) {
                flag = true;
                chatKey = data.key;
            }

        });

        if (flag === false) {
            chatKey = firebase.database().ref('connection_list').push(friendList, function(error) {
                if (error) {
                } else {
                    ShowResults(key, name, photo);
                }
            }).getKey();
        } else {
            ShowResults(key, name, photo);
        }
        document.getElementById('chat').innerHTML = "";
        // Displaying Previous Messages
        LoadPreviousMessages(chatKey);
    });
}

function ShowResults(key, name, photo) {
    document.getElementById("chatName").textContent = name;
    document.getElementById("chatImg").src = photo;
    document.getElementById("chatImg").alt = name;
}

// CHATTING START HERE
document.getElementById("messageBox").addEventListener("keydown", function(key) {
    if (key.which == 13) {
        var TEXT = document.getElementById('messageBox').value;
        var DATE = new Date().toLocaleString();
        var chatMessage = {
            userID: currentUserKey,
            msg: TEXT,
            datetime: DATE,
            msgType: 'text'
        }
        if (TEXT === "") {
            return false;
        } else {
            firebase.database().ref("ChatMessage").child(chatKey).push(chatMessage, function(error) {});
        }
    } else {
        return false;
    }
});

// SENDING IMAGE FILE
function ChooseImage() {
    document.getElementById('ImageFile').click();
}

function SendImage(event) {
    var file = event.files[0];
    var FILENAME = file.name;
    if (!file.type.match("image.*")) {
        alert('Only Select Images');
    } else {
        var reader = new FileReader();
        reader.addEventListener("load", function() {
            var DATE = new Date().toLocaleString();
            var chatMessage = {
                userID: currentUserKey,
                msg: reader.result,
                datetime: DATE,
                msgType: 'image',
                filename: FILENAME
            }
            firebase.database().ref("ChatMessage").child(chatKey).push(chatMessage, function(error) {
                if (error) {
                    alert('Error in Server. Sorry!');
                }
            });
        }, false);

        if (file) {
            reader.readAsDataURL(file);

        }
    }
}

// Loading Recent ChatList
function LoadChatList() {
    document.getElementById('loader').style.display = "block";
    const friends_lists = {};
    var db = firebase.database().ref('connection_list');
    db.on('value', function(lists) {
        lists.forEach(function(data) {
            var lst = data.val();
            var friendKey = '';
            if (lst.friendID === currentUserKey) {
                friendKey = lst.userID;
            } else if (lst.userID === currentUserKey) {
                friendKey = lst.friendID;
            } else {}

            if (friendKey !== "") {
                firebase.database().ref('users').child(friendKey).on('value', function(data) {
                    var user = data.val();
                    friends_lists[data.key] = [data.key, user.name, user.photo, user.date]
                });
            }
        });
        for (var key in friends_lists) {
          li_data += `<li onclick="StartChat('${friends_lists[key][0]}', '${friends_lists[key][1]}','${friends_lists[key][2]}')">
            <div class="listRecentItem">
              <img src="${friends_lists[key][2]}" alt="${friends_lists[key][1]}">
              <div>
                <h4>${friends_lists[key][1]}</h4>
                <small>joined at ${friends_lists[key][3]}</small>
              </div>
            </div>
          </li>`;
        }
        document.getElementById('loader').style.display = "none";
        document.getElementById("RECENTUSERS").innerHTML = "";
        document.getElementById("RECENTUSERS").innerHTML += li_data;


    });
}

// Loading Previous Messages
function LoadPreviousMessages(ChatKey) {
  document.getElementById('loader').style.display = "block";
    var db = firebase.database().ref('ChatMessage').child(ChatKey);
    db.on('value', function(chats) {
        document.getElementById('chat').innerHTML = "";
        var message = '';
        chats.forEach(function(data) {
            var chat = data.val();
            var msg = "";
            firebase.database().ref('users').child(chat.userID).on('value', function(user_data) {
                var user = user_data.val();
                user_name_chat = user.name;
                user_name_image = user.photo;
            })
            if (chat.msgType === "image") {
              if (chat.userID !== currentUserKey) {
                  message = `<li><div class="userMessageImage">
                    <div class="main">
                      <img id="profImage" src="${user_name_image}" alt="${user_name_chat}">
                      <div class="messageUSER">
                        <a href="${chat.msg}" data-lightbox='birdy'>
                          <img src="${chat.msg}" alt="">
                        </a>
                      </div>
                    </div>
                  </div></li>`;
              document.getElementById('chat').innerHTML += message;
              } else {
                  message = `<li><div class="meMessageImage">
                    <div class="main">
                      <div class="messageUSER">
                        <a href="${chat.msg}" data-lightbox='birdy'>
                          <img src="${chat.msg}" alt="">
                        </a>
                      </div>
                      <img id="profImage" src="${firebase.auth().currentUser.photoURL}" alt="${firebase.auth().currentUser.displayName}">
                    </div>
                  </div></li>`;
                document.getElementById('chat').innerHTML += message;
              }
            } else if (chat.msgType === "text") {
              if (chat.userID !== currentUserKey) {
                  message = `<li><div class="userMessage">
                    <div class="main">
                      <img src="${user_name_image}" alt="${user_name_chat}">
                      <div class="messageUSER">
                        ${chat.msg}
                      </div>
                    </div>
                  </div></li>`;
              document.getElementById('chat').innerHTML += message;
              } else {
                  message = `<li><div class="meMessage">
                    <div class="main">
                      <div class="messageME">
                        ${chat.msg}
                      </div>
                      <img src="${firebase.auth().currentUser.photoURL}" alt="${firebase.auth().currentUser.displayName}">
                    </div>
                  </div></li>`;
                document.getElementById('chat').innerHTML += message;
              }
            } else {}
        });
        document.getElementById('loader').style.display = "none";
        document.getElementById('messageBox').value = '';
        document.getElementById('messageBox').focus();
        document.getElementById("scroll").scrollTo(0, document.getElementById("scroll").clientHeight);
    });
}
