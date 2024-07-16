import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../socket";
import Peer from "peerjs";
import { v4 as uuid } from "uuid";
import VideoPlayer from "../components/interview/VideoPlayer";
import { peersReducer } from "../peerReducer";
import { addPeerAction, removePeerAction } from "../peerActions";

const VideoCall = () => {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [stream, setStream] = useState();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const { id } = useParams();
  const socket = getSocket();
  const [camera, setCamera] = useState(true);
  const [voice, setVoice] = useState(true);
  const getUsers = ({ participants }) => {
    console.log({ participants });
  };
  useEffect(() => {
    const meId = uuid();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: camera, audio: voice })
        .then((stream) => {
          console.log(stream);
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }

    socket.on("get-users", getUsers);

    return () => {
      dispatch(removePeerAction(me, stream));
    };
  }, []); // Only run this effect once, on component mount

  useEffect(() => {
    if (me) {
      socket.emit("join-room", { roomId: id, peerId: me._id });
    }
  }, [id, me, socket]); // Ensure socket reference doesn't change

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket?.on("user-joined", ({ peerId }) => {
      const call = me?.call(peerId, stream);
      call?.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });
    me?.on("call", (call) => {
      call?.answer(stream);
      call?.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream, peers]);

  console.log(peers);


  const handleQuit = () => {
    stream.getVideoTracks().forEach((track) => track.stop());
    stream.getAudioTracks().forEach((track) => track.stop());
    navigate("/myinterviews");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <VideoPlayer stream={stream} />
        {Object.values(peers).map((peer) => (
          <VideoPlayer key={peer.id} stream={peer.stream} />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 bg-opacity-50 text-white p-2 flex justify-center">
        <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md mr-2">
          Toggle Camera
        </button>
        <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md mr-2">
          Toggle Audio
        </button>
        <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md" onClick={handleQuit}>
          Quit
        </button>
      </div>
    </div>

  );
};

export default VideoCall;
