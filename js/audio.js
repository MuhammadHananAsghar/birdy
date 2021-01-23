let chunks = [];
let recorder;

function Record(control) {
    let device = navigator.mediaDevices.getUserMedia({ audio: true });
    device.then(stream => {
        if (recorder === undefined) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
                chunks.push(e.data);

                if (recorder.state === 'inactive') {
                    let blob = new Blob(chunks, { type: 'audio/webm' });
                    var reader = new FileReader();

                    reader.addEventListener("load", function() {
                        var DATE = new Date().toLocaleString();
                        var chatMessage = {
                            userID: currentUserKey,
                            msg: reader.result,
                            datetime: DATE,
                            msgType: 'audio'
                        }
                        console.log("TO CLOUD");
                        firebase.database().ref("ChatMessage").child(chatKey).push(chatMessage, function(error) {
                            if (error) {
                                alert('Error in Server');
                            }
                        });
                    }, false);

                    reader.readAsDataURL(blob);
                }
            }
            document.getElementById('MicDiv').style.color = 'red';
            document.getElementById('code').textContent = 'stop';
            recorder.start();
        }
    });

    if (recorder !== undefined) {
        if (document.getElementById('code').textContent === 'stop') {
          document.getElementById('MicDiv').style.color = '#b3b7d1';
          document.getElementById('code').textContent = 'start';
            recorder.stop();
        } else {
          document.getElementById('MicDiv').style.color = 'red';
          document.getElementById('code').textContent = 'stop';
            recorder.start();
        }
    }
}
