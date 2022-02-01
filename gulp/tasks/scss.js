import dartSass from 'sass'; // Плагин препроцессора sass;
import gulpSass from 'gulp-sass'; // Плагин для запуска препроцессора sass;
import rename from 'gulp-rename'; // Плагин для переименовывания файлов;

import cleanCss from 'gulp-clean-css';  // Сжатие CSS-файла;
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений; Для работы необходим плагин webp-converter@2.2.3 (именно эта версия);
import autoprefixer from 'gulp-autoprefixer';   // Добавление вендорных префиксов;
import groupCssMediaQueries from 'gulp-group-css-media-queries';    // Группировка медиа запросов;

const sass = gulpSass(dartSass); // Вызов из плагина gulp-sass с передачей компилятора;

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // Указывает путь поиска файлов scss и создаёт карты, в которых указывается в каком именно файле хранится тот или иной стиль;
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({ // Говорит браузеру, что есть он умеет в webp, то бери в webp; Если не умеет, то вот тебе другой формат;
                    webpClass: ".webp",
                    neWebpClass: ".no-webp"
                    }
                )
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true, // Поддержка grid, что бы эти свойства обрабатывались этим плагином;
                    overrideBrowserslist: ["last 3 versions"],  // Указывается колличество версий браузера для поддержки;
                    cascade: true
                })
            )
        )
        //.pipe(app.gulp.dest(app.path.build.css)) // Раскомментировать, если нужен не сжатый дубль файла стилей;
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css)) // Выгружаем в папку с результатом:
        .pipe(app.plugins.browsersync.stream()); // Отслеживаем все изменения в реальном времени;
}