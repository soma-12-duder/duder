var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);

        stompClient.subscribe('/pop/message', function (chat) {
            console.log(JSON.parse(chat.body));
            showChat(JSON.parse(chat.body).data);
        });
    });
    init();
}

function sendChat() {
    stompClient.send("/queue/message", {}, JSON.stringify({'sender_id': 2, 'sender_nickname': $("#name").val(),
        'room_id' : 1, 'content': $("#chatMessage").val()}));
}

function showChat(chat) {
    $("#greetings").append("<tr><td>" + chat.sender_nickname + " : " + chat.content + "</td></tr>");
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#chatSend" ).click(function(){ sendChat(); });
});

function init(){
}

