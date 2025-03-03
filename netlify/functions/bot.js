exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        console.log("Получено сообщение от Telegram:", body);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Webhook работает!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message }),
        };
    }
};
