const select = {
  loginForm : '#welcome-form',
  messagesSection: '#messages-section',
  messagesList: '#messages-list',
  addMessageForm: '#add-messages-form',
  userNameInput: '#username',
  messageContentInput: '#message-content',
}

const classNames = {
  show: 'show',
};

//dom selectors
const loginForm = document.querySelector(select.loginForm);
const messagesSection = document.querySelector(select.messagesSection);
const messagesList = document.querySelector(select.messagesList);
const addMessageForm = document.querySelector(select.addMessageForm);
const userNameInput = document.querySelector(select.userNameInput);
const messageContentInput = document.querySelector(select.messageContentInput);

//WS
const socket = io();
//listen to messages from server and render
socket.on('message', ({ author, content }) => addMessage(author, content));

//global consts
let userName = '';
const messages = [];

//hide messages
messagesSection.classList.remove(classNames.show);

//login form
const login = ()=>{ 
  if(userNameInput.value){
    userName = userNameInput.value;
    loginForm.classList.remove(classNames.show);
    messagesSection.classList.add(classNames.show);
    socket.emit('join', { userName: userName });
  }else{
    alert('Please type username');
  }
}

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  login();
});

//client msg function
const addMessage = (author, content)=>{
  const context = document.createElement('div');   
  const messageTemplate = 
  `<li class="message message--received ${author == userName ? 'message--self' : author == 'ChatBot' ? 'message--bot' : ''}">
    <h3 class="message__author">${author == userName ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  </li>`;
  context.innerHTML = messageTemplate;
  messagesList.appendChild(context.firstChild);
}

//msg form handler
addMessageForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(messageContentInput.value){
    const messageContent = messageContentInput.value;
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }else{
    alert('Please type message');
  }  
});

