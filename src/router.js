import { createRouter, createWebHistory } from 'vue-router'
import GuildDashboard from './pages/GuildDashboard.vue'
import NotFound from './pages/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/guild/:guildId', component: GuildDashboard },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})