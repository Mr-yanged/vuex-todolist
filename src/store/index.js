import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 列表数据
        list: [],
        // input 输入框的值
        inputValue: 'aaa',
        // 下一个id
        nextId: 5,
        // 当前处于的key
        active: 'all'
    },
    mutations: {
        // 获得列表数据
        initList(state, list) {
            state.list = list
        },
        // 同步用户输入的值
        setInputValue(state, step) {
            state.inputValue = step
        },
        // 添加任务项
        addOptions(state) {
            const item = {
                id: state.nextId,
                info: state.inputValue,
                done: false
            }
            state.list.push(item)
                // 清空输入框
            state.inputValue = ''
            state.nextId++
        },
        // 删除任务型
        removeOptions(state, step) {
            const idIndex = state.list.findIndex(item => {
                return item.id === step
            })
            if (idIndex !== -1) {
                state.list.splice(idIndex, 1)
            }
        },
        // 修改复选框选中状态
        cbModifyStatus(state, obj) {
            const i = state.list.findIndex(item => item.id == obj.id)
            if (i !== -1) {
                state.list[i].done = obj.status
            }
        },
        // 清除已完成的任务
        cleanDone(state) {
            const newList = state.list.filter(item => item.done === false)
            state.list = newList
        },
        // 修改当前处于的key
        activeKey(state, step) {
            state.active = step
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                context.commit('initList', data)
            })
        }
    },
    getters: {
        // 统计未完成的任务条数
        amountTask(state) {
            return state.list.filter(item => item.done === false).length
        },
        // 要显示的数据
        infoList(state) {
            if (state.active === 'all') {
                return state.list
            } else if (state.active === 'undone') {
                return state.list.filter(item => item.done === false)
            } else {
                return state.list.filter(item => item.done === true)
            }
        }
    },
    modules: {}
})