import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import GuildDashboard from './pages/GuildDashboard.vue'
import Terms from './pages/Terms.vue'
import Privacy from './pages/Privacy.vue'
import Pricing from './pages/Pricing.vue'
import Billing from './pages/Billing.vue'
import NotFound from './pages/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/terms', component: Terms },
    { path: '/privacy', component: Privacy },
    { path: '/pricing', component: Pricing },
    { path: '/billing', component: Billing },
    { path: '/guild/:guildId', component: GuildDashboard },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})