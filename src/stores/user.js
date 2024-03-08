import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const userStore = defineStore('user', {
    // 在 Pinia 中，state 被定义为一个返回初始状态的函数
    state: () => ({
            // 所有这些属性都将自动推断出它们的类型
        count: 0,
        name: 'Eduardo',
        isAdmin: true,
        items: [],
        hasChanged: true
    }),
    actions: {
        reset(){
            this.count = 0
        }
    }
})


export const userStore2 = defineStore('user2', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment(){
        count.value++
    }

    function $reset(){
        count.value = 0
    }

    return {count, doubleCount, increment, $reset}
})
