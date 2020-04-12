// 文件位置：src/store/index.js

// => 初始化数据
export const initialState = {
    message: '众志成城，抗疫救灾',
    count: 0
};
// => Reducer 处理函数
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updaeMessage': 
            return {
                ...state,
                message: action.message
            };
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            };
        case 'decrement':
            return {
                ...state,
                count: state.count - 1
            };
        default: {
            throw new Error();
        }
    }
}
