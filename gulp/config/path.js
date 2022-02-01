//Получаем имя папки проекта
import * as nodePath from 'path'; //Импорт модуля из package.json;
const rootFolder = nodePath.basename(nodePath.resolve()); //Получаем имя папки проекта с помощью модуля;


const buildFolder = `./dist`;   //Путь к папке с результатом работы / можно использовать rootFolder;
const srcFolder = `./src`;  //Путь к папке с исходниками;

export const path = {  //Информация о пути к файлам и папкам;
    build: {    //Объект путей к папке с результатами;
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts`,
        files: `${buildFolder}/files/`  //Указывает место, в которое переносятся папки и файлы с результатом;
    },  
    src: {      //Объект путей к папке с исходниками;
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        files: `${srcFolder}/files/**/*.*`  //Указывает на все папки и файлы внутри /files;
    }, 
    watch: {    //Объект путей к папкам и файлам за которыми следит gulp;
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
        files: `${srcFolder}/files/**/*.*`
    },  
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFoldre: rootFolder,
    ftp: `` //Место указания адреса удалённо папки на ftp-сервере;
}
