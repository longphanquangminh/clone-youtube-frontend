import { useState } from "react";
import { io } from "socket.io-client";

const Socket = () => {
  // đối tượng socket client
  let socket = io("ws://localhost:8080");

  socket.on("fe-connect", data => {
    // setData(data + " Đã kết nối,");
    // document.querySelector("#noiDung").innerHTML += data + " đã kết nối <br/>";
  });
  socket.on("fe-number", data => {
    document.querySelector("#noiDung").innerHTML = data;
  });

  return (
    <div className='text-white'>
      <h1 id='noiDung'>0</h1>

      <button
        className='btn btn-success'
        onClick={() => {
          socket.emit("number-be", "");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Socket;
