<template>
    <div id="app">
        <a-input
            placeholder="请输入任务"
            class="my_ipt"
            :value="inputValue"
            @change="valHandle"
        />
        <a-button type="primary" @click="addItem">添加事项</a-button>

        <a-list bordered :dataSource="$store.getters.infoList" class="dt_list">
            <a-list-item slot="renderItem" slot-scope="item">
                <!-- 复选框 -->
                <a-checkbox
                    :checked="item.done"
                    @change="cbStatusChanged(item.id, $event)"
                    >{{ item.info }}</a-checkbox
                >
                <!-- 删除链接 -->
                <a slot="actions" @click="removeItem(item.id)">删除</a>
            </a-list-item>

            <!-- footer区域 -->
            <div slot="footer" class="footer">
                <!-- 未完成的任务个数 -->
                <span>{{ $store.getters.amountTask }}条剩余</span>
                <!-- 操作按钮 -->
                <a-button-group>
                    <a-button
                        :type="active === 'all' ? 'primary' : ''"
                        @click="changeList('all')"
                        >全部</a-button
                    >
                    <a-button
                        :type="active === 'undone' ? 'primary' : ''"
                        @click="changeList('undone')"
                        >未完成</a-button
                    >
                    <a-button
                        :type="active === 'done' ? 'primary' : ''"
                        @click="changeList('done')"
                        >已完成</a-button
                    >
                </a-button-group>
                <!-- 把已经完成的任务清空 -->
                <a @click="cleanCompleted">清除已完成</a>
            </div>
        </a-list>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { log } from 'util'
export default {
    name: 'app',
    data() {
        return {}
    },
    methods: {
        ...mapMutations([
            'setInputValue',
            'addOptions',
            'removeOptions',
            'cbModifyStatus',
            'cleanDone'
        ]),
        ...mapActions(['getList']),
        valHandle(e) {
            this.setInputValue(e.target.value)
        },
        // 添加事项
        addItem() {
            // 判断用户输入是否为空
            if (this.inputValue.trim().length <= 0) {
                return this.$message.warning('输入不能为空')
            }
            // 进行添加
            this.addOptions()
        },
        // 删除事项
        removeItem(id) {
            this.removeOptions(id)
        },
        // 复选框状态改变
        cbStatusChanged(id, e) {
            this.cbModifyStatus({
                status: e.target.checked,
                id: id
            })
        },
        // 清除已完成的任务
        cleanCompleted() {
            this.cleanDone()
        },
        // 当前 处于 “全部”、“未完成”、“已完成” 之一
        changeList(key) {
            this.$store.commit('activeKey', key)
        }
    },
    computed: {
        ...mapState(['list', 'inputValue', 'active'])
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
#app {
    padding: 10px;
}

.my_ipt {
    width: 500px;
    margin-right: 10px;
}

.dt_list {
    width: 500px;
    margin-top: 10px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
