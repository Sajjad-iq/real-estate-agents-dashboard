import { createRouter, createWebHistory } from 'vue-router'
import AgentsPage from '@/pages/agents/AgentsPage.vue'
import AgentProfile from '@/pages/agents/AgentProfile.vue'
import AgentPropertiesPage from '@/pages/properties/AgentPropertiesPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/agents'
        },
        {
            path: '/agents',
            name: 'agents',
            component: AgentsPage,
            meta: {
                title: 'Agencies Dashboard'
            }
        },
        {
            path: '/agents/:agentId',
            name: 'agent-profile',
            component: AgentProfile,
            meta: {
                title: 'Agency Profile',
                requiresAuth: false
            }
        },
        {
            path: '/agents/:agentId/properties',
            name: 'agent-properties',
            component: AgentPropertiesPage,
            meta: {
                title: 'Agency Properties',
                requiresAuth: false
            }
        },
        // Future: Property detail page
        // {
        //     path: '/properties/:propertyId',
        //     name: 'property-detail',
        //     component: () => import('@/pages/properties/PropertyDetail.vue'),
        //     meta: {
        //         title: 'Property Details',
        //         requiresAuth: false
        //     }
        // },
        // Catch-all route for 404 pages
        {
            path: '/:pathMatch(.*)*',
            redirect: '/agents'
        }
    ]
})

// Navigation guards (if needed)
router.beforeEach((to, from, next) => {
    // You can add authentication or other checks here
    next()
})

export default router 