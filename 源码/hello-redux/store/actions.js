// 1. 修改名字
const CHANGE_NAME = (name) => ({
    type: "CHANGE_NAME",
    name
});
// 2. 修改照片
const CHANGE_PICTURE = (picture) => ({
    type: "CHANGE_PICTURE",
    picture
});

// 3. 显示弹框
const SHOW_DIALOG = () => ({
    type: "SHOW_DIALOG"
});

// 4. 关闭弹框
const CLOSE_DIALOG = () => ({
    type: "CLOSE_DIALOG"
});

module.exports = {
    CHANGE_NAME,
    CHANGE_PICTURE, 
    SHOW_DIALOG,
    CLOSE_DIALOG
}
