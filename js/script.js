document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    // Восстанавливаем активный раздел из localStorage
    const activePage = localStorage.getItem("activeNav");
    if (activePage) {
        navItems.forEach(nav => nav.classList.remove("active"));
        document.querySelector(`.nav-item[href="${activePage}"]`)?.classList.add("active");
    }

    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(nav => nav.classList.remove("active")); // Удаляем у всех
            this.classList.add("active"); // Добавляем активный

            // Сохраняем в localStorage
            localStorage.setItem("activeNav", this.getAttribute("href"));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tg = window.Telegram.WebApp;

    tg.expand(); // Разворачивает мини-приложение на весь экран

    // Меняет цвет заголовка и фона в Telegram
    tg.setHeaderColor("#ffffff");
    tg.setBackgroundColor("#f8f8f8");

    console.log("Telegram WebApp API подключен");
});
