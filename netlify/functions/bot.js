const axios = require("axios");

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        console.log("Получено сообщение от Telegram:", body);

        const chatId = body.message?.chat?.id;
        const messageText = body.message?.text;
        const botToken = process.env.BOT_TOKEN;  // Используем переменную окружения

        if (!botToken) {
            throw new Error("BOT_TOKEN не задан. Добавьте его в переменные окружения Netlify.");
        }

        if (chatId && messageText) {
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: `Вы сказали: ${messageText}`
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Сообщение обработано!" }),
        };
    } catch (error) {
        console.error("Ошибка обработки запроса:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message }),
        };
    }
};
