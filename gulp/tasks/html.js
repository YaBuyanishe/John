import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // Плагин для работы с изображениями формата Webp;
import versionNumber from "gulp-version-number"; // Плагин запрещающий определённым фалам кешироваться в браузере;

export const html = () => {
    return app.gulp.src(app.path.src.html) // Разрешение для gulp получать папки и фалйы по указанному пути (в файле path.js);
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"   // Сообщение при возникновении ошибок;
        }))
    )
    .pipe(fileInclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // Инструкция для замены в пути файла до картинки @img на понятный для браузера путь;
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            versionNumber({ // Добавляет к адресу файлов текущую дату и время;
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js,'
                    ]
                },
                'output': {
                    'file': 'gulp/version.json' // Создает файл version.json, в которой будет храниться данный ключ;
                }
            })
        )
    )
    .pipe(app.gulp.dest(app.path.build.html)) // Указывает gulp куда надо перенести папки и файлы;
    .pipe(app.plugins.browsersync.stream());
}