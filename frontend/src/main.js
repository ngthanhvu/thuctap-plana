import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import './style.css'
import 'notyf/notyf.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.mount('#app')