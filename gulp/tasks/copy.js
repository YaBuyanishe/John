export const copy = () => {
    return app.gulp.src(app.path.src.files) // Разрешение для gulp получать папки и фалйы по указанному пути (в файле path.js);
    .pipe(app.gulp.dest(app.path.build.files)) // Указывает gulp куда надо перенести папки и файлы;
}