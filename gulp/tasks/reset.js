import del from "del"; // Удаление папки или файла из папки с резульатом, если он удаляется из папки с исходниками;
export const reset = () => {
    return del(app.path.clean)
}