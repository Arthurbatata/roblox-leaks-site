const chatLog = document.getElementById("chat-log");
const userMessageInput = document.getElementById("user-message");

function appendMessage(role, text) {
    const message = document.createElement("div");
    message.classList.add(role);
    message.textContent = text;
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight; // Role até a parte mais recente
}

async function sendMessage() {
    const userMessage = userMessageInput.value;
    appendMessage("user", userMessage);

    try {
        const apiKey = process.env['OPENAI_API_KEY']; // Substitua pela sua chave de API
        const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";

        const requestData = {
            prompt: userMessage,
            max_tokens: 50
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Erro ao chamar a API da OpenAI');
        }

        const data = await response.json();

        const carlosResponse = data.choices[0].text;
        appendMessage("carlos", carlosResponse);
    } catch (error) {
        console.error("Erro ao obter a resposta do Carlos:", error);
    }

    userMessageInput.value = ""; // Limpar a entrada do usuário
}
