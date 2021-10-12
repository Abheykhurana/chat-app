const socket = io();

$("#chatting").hide();

$("#send-btn").click(function () {
  // console.log("CLICKED");
  const msgTxt = $("#inp-msg").val();
  // console.log(msgTxt);

  socket.emit("send_msg", {
    msg: msgTxt,
  });

  $("#inp-msg").val("");
});

socket.on("rec_msg", (data) => {
  // if (socket.id != data.user.id)
  $("#chat").append(`<li><strong>${data.user}</strong> : ${data.msg}</li>`);

  $("#chat-box").scrollTop($("#chat-box").outerHeight());
});

$("#login-btn").click(function () {
  const user = $("#login-inp").val();

  socket.emit("login", {
    user: user,
    id: socket.id,
  });
  // console.log(user);
  $("#login-inp").val("");

  $("#login").hide();
  $("#chatting").show();
});
