export const server = (done) => {   // Функия server;
    app.plugins.browsersync.init({  // Глобальное обращение к переменной plugins и инициализация плагина;
        server: {
            baseDir: `${app.path.build.html}`   // Базовая папка для запуска файлов;
        },
        nhotify: false, // Убираются сообщения в браузере;
        port: 3000, // Указание порта для локального сервера;
    });
}