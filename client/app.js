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
  }else{
    alert('Please type username');
  }
}

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  login();
});

//msg function
const addMessage = (author, content)=>{
  const context = document.createElement('div');   
  const messageTemplate = 
  `<li class="message message--received ${author == userName ? 'message--self' : ''}">
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
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }else{
    alert('Please type message');
  }  
});