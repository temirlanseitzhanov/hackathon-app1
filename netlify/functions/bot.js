const axios = require("axios");

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        console.log("Получено сообщение от Telegram:", body);

        const chatId = body.message?.chat?.id;
        const messageText = body.message?.text;
        const botToken = process.env.BOT_TOKEN;

        if (!botToken) {
            throw new Error("BOT_TOKEN не задан. Добавьте его в переменные окружения Netlify.");
        }

        // Отвечаем только на команду /start
        if (messageText === "/start") {
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: "Добро пожаловать! Запустите Mini App 👇",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🚀 Открыть Mini App",
                                web_app: { url: "https://shimmering-travesseiro-b15efa.netlify.app/" }
                            }
                        ]
                    ]
                }
            });

            return { statusCode: 200, body: JSON.stringify({ success: true, message: "Mini App кнопка отправлена" }) };
        }

        // Если сообщение не /start, просто игнорируем его
        return { statusCode: 200, body: JSON.stringify({ success: true, message: "Сообщение проигнорировано" }) };
    } catch (error) {
        console.error("Ошибка обработки запроса:", error);
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
