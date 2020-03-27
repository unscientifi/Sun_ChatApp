// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
import RoomMessage from "./modules/RoomMessage.js";
import LeaveMessage from "./modules/LeaveMessage.js";


const socket = io();

function setUserId({sID, message}) {
    //debugger;
    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    // take the incoming message and push it into the Vue instance 
    // into the messages array
    vm.messages.push(msg);
}

// this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",      
        messages: [],
        message: "",
        nickname: ""
    },

    methods: {
        submitName() {
            console.log('name entered');

            socket.emit('chat_message', {
                name: this.nickname || "anonymous",
            })

            // hide the login and reveal the textarea
            document.querySelector('.modal').style.visibility='hidden';
            document.querySelector('.container').style.visibility='visible';
            
        },

        dispatchMessage() {
            // emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', { 
                content: this.message,
                name: this.nickname || "anonymous"
                // || is called a double pipe operator or an "or" operator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
            })
 
        },

        leaveRoom() {
            console.log('handle disconnect');
            

            socket.on('chat_message', function(msg) {
                // name: this.nickname || "anonymous",
                // content: this.message,
                io.emit('user_disconnect', message);
            })

            document.querySelector('.leave-message').style.visibility='visible';
            document.querySelector('.room-message').style.visibility='hidden';
            // document.location.href="/";
        }

    },

    components: {
        newmessage: ChatMessage,
        roommessage: RoomMessage,
        leavemessage: LeaveMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");


// some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);