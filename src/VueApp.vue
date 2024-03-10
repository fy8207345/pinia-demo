<script setup>
import {computed, reactive, ref, onMounted, watch, watchEffect} from "vue";

const count = ref(0)
console.log(count)
console.log(count.value)

// 函数只能操作value
// template可以直接操作对象
function increment(){
  count.value++
}

const obj = ref({
  nested: {count: 0},
  arr: ['foo', 'bar']
})
function push(){
  console.log(obj)
  obj.value.arr.push('bbb')
}

const state = reactive({count: 0})
const reactiveObj = reactive({
  nested: {count: 0},
  arr: ['foo', 'bar']
})
console.log(reactiveObj)

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
// 计算属性会被缓存，只有它的响应式依赖变化时，才会重新计算
// 方法不会缓存
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
const now = computed(() => Date.now())

// 可写计算属性
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get(){
    return firstName.value + ' ' + lastName.value
  },
  set(newValue){
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
fullName.value = 'John Snow'

const isActive = ref(true)
const hasError = ref(false)

const classObject = reactive({
  active: true,
  'text-danger': false
})
const computedClass = computed(() => ({
  active: isActive.value && !hasError.value,
  'text-danger': hasError.value
}))

const activeClass = ref('active')
const errorClass = ref('text-danger')

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

const awesome = ref(true)

const templateRender = ref(true)

const show = ref(false)

const items = ref([{message: 'Foo'}, {message: 'Bar'}])

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

const text = ref('')
const checked = ref(false)
const checkedNames = ref([])

const radio = ref('')
const selected = ref([])

onMounted(() => {
  console.log('onMounted', this)
})
onMounted(() => {
  console.log('onMounted!!!', this)
})
watch(selected, async (newValue, oldValue) => {
  console.log('selected', oldValue, newValue)
})

const x = ref(0)
const y = ref(0)
// 监听单个Ref
watch(x, (newX) => {
  console.log('x is ', newX)
})
// 监听getter函数
watch(
    () => x.value + y.value,
    (sum) => {
      console.log('sum change!', sum)
    }
)
// 监听多个来源的数组
watch(
    [x, () => y.value],
    ([newX, newY]) => {
      console.log('new x,y:', newX, newY)
    }
)

const object = reactive({count: 0})
// 深层监听，包含它的属性
watch(object, (newValue, oldValue) => {
  //两个是同一个对象，只是属性值发送变化
  console.log(newValue === oldValue, newValue.count, oldValue.count)
})
// getter监听
watch(() => object.count, (newValue, oldValue) => {
  console.log('value watch: ', newValue, oldValue)
},
    //创建监听器时，立即执行一次，有变更时再次执行
    {immediate: true})

const todoId = ref(1)
const data = ref(null)
// 方式一
watch(todoId, async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = await response.json()
  console.log('watch', data)
}, {immediate: true})

// 方式二
watchEffect(async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = await response.json()
  console.log('watchEffect', data)
})
// 声明一个ref来存放该元素的引用
// 必须和模板里的ref同名
const input = ref(null);
onMounted(() => {
  input.value.focus()
  console.log('input focused:', input)
})

const list = ['A', 'B', 'C', 'D']
const itemRefs = ref([])
onMounted(() => {
  console.log('itemRefs', itemRefs)
})
</script>

<template>
  <div class="wrapper">

    <ul>
      <li v-for="item in list" ref="itemRefs">
        {{item}}
      </li>
    </ul>
    <input ref="input">
    <br/>
    <button @click="object.count++">object.count</button>
    <br/>
    <button @click="x++">x</button>
    <button @click="y++">y</button>
    <br/>
    <div>Selected: {{selected}}</div>
    <select v-model="selected" >
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <br/>
    <div>Picked : {{radio}}</div>
    <input type="radio" id="one" value="one" v-model="radio" />
    <label for="one">one</label>
    <input type="radio" id="two" value="two" v-model="radio" />
    <label for="two">two</label>

    <br/>
    <input v-model="text" placeholder="input text">
    <p>text is : {{text}}</p>
    <textarea v-model="text"></textarea>
    <input type="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>

    <div>checked names: {{checkedNames}}</div>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>

    <br/>
    <ol>
      <li v-for="(item, index) in items">
        {{item.message}} - {{index}}
      </li>
    </ol>

    <ol>
      <li v-for="(item, index) of items">
        {{item.message}} - {{index}}
      </li>
    </ol>

    <ol>
      <li v-for="({message}, index) of items">
        {{message}} - {{index}}
      </li>
    </ol>

    <ul>
      <li v-for="(value, key, index) of myObject" :key="key">
        {{key}} - {{value}} - {{index}}
      </li>
    </ul>

    <br/>
    <h1 v-show="show">V-Show</h1>

    <br/>
    <template v-if="templateRender">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>

    <br/>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no!!</h1>
    <button @click="awesome = !awesome">Toggle</button>

    <br/>
    <span :style="{color: activeColor, fontSize: fontSize + 'px'}">style</span>
    <span :style="styleObject">style object</span>

    <br/>
    <span>count is : {{count}}</span>
    <button @click="count++">{{count}}</button>
    <button @click="increment">{{count}}</button>

    <br/>

    <button @click="obj.nested.count++">{{obj.nested.count}}</button>
    <span>{{obj.arr}}</span>
    <button @click="push">Push</button>

    <br/>

    <button @click="state.count++">{{state.count}}</button>
    <button @click="reactiveObj.nested.count++">{{reactiveObj.nested.count}}</button>

    <br/>

    <p>Has published books:</p>
    <span>{{publishedBooksMessage}}</span>
    <span>now is : {{now}}</span>

    <br/>

    <span>可写计算属性：{{fullName}}</span>

    <br/>

    <div :class="{active: isActive, 'text-danger': hasError}">active</div>
    <div :class="classObject">class object</div>
    <div :class="computedClass">computed class</div>
    <div :class="[activeClass, errorClass]">class array</div>
    <div :class="[{active: isActive}, errorClass]">class array2</div>
  </div>
</template>

<style scoped>

</style>
