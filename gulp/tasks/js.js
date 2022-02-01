import webpack from "webpack-stream"; // Подключение webpack

export const js = () => {   // Функиция JS;
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) // Доступ к файлам и построению карты исходников;
        .pipe(app.plugins.plumber(  // Обратка ошибок во время компиляции;
            app.plugins.notify.onError({ // Вывод ошибок;
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({ // Вызов webpack;
            mode: app.isBuild ? 'production' : 'development',    // Режим разработчика;
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js)) // Выгрузка в папку с результатом;
        .pipe(app.plugins.browsersync.stream()); // Обновление браузера;
}