// main.js
const messageInput = document.getElementById('messageInput');  // 获取输入框
const sendBtn = document.getElementById('sendBtn');  // 获取发送按钮
const messageBox = document.getElementById('messageBox');  // 显示消息的容器

// 创建 WebSocket 连接
const ws = new WebSocket('ws:/52.197.53.224');  // 连接到 WebSocket 服务端

// WebSocket 连接建立时触发
ws.addEventListener('open', () => {
    console.log('WebSocket connected');
    displayMessage('Connected to WebSocket server');
});

// 接收到 WebSocket 消息时触发
ws.addEventListener('message', (event) => {
    const serverMessage = event.data;
    console.log('Received from server: ', serverMessage);
    displayMessage(`Server: ${serverMessage}`);
});

// 监听 WebSocket 错误
ws.addEventListener('error', (error) => {
    console.error('WebSocket error: ', error);
    displayMessage('WebSocket error occurred');
});

// 监听 WebSocket 关闭
ws.addEventListener('close', () => {
    console.log('WebSocket connection closed');
    displayMessage('Disconnected from WebSocket server');
});

// 发送按钮点击事件
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    
    if (message && ws.readyState === WebSocket.OPEN) {
        ws.send(message);  // 发送消息给服务器
        displayMessage(`You: ${message}`);
        messageInput.value = '';  // 清空输入框
    } else {
        console.log('WebSocket is not open');
        displayMessage('WebSocket is not open or message is empty');
    }
});

// 显示消息的函数
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageBox.appendChild(messageDiv);  // 将消息添加到显示区域
}
