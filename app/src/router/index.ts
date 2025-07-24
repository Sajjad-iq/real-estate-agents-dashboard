import { createRouter, createWebHistory } from 'vue-router'
import AgentsPage from '@/pages/agents/AgentsPage.vue'
import AgentProfile from '@/pages/agents/AgentProfile.vue'
import AgentPropertiesPage from '@/pages/properties/AgentPropertiesPage.vue'
import NotImplemented from '@/pages/NotImplemented.vue'

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
                title: 'Agencies Dashboard',
                currentView: 'dashboard',
                showBackButton: false
            }
        },
        {
            path: '/agents/:agentId',
            name: 'agent-profile',
            component: AgentProfile,
            meta: {
                title: 'Agency Profile',
                currentView: 'profile',
                showBackButton: true,
                requiresAuth: false
            }
        },
        {
            path: '/agents/:agentId/properties',
            name: 'agent-properties',
            component: AgentPropertiesPage,
            meta: {
                title: 'Agency Properties',
                currentView: 'properties',
                showBackButton: true,
                requiresAuth: false
            }
        },
        // Future routes can be added here
        {
            path: '/subcategories',
            name: 'subcategories',
            component: NotImplemented,
            meta: {
                title: 'Subcategories',
                currentView: 'subcategories',
                showBackButton: false
            }
        },
        {
            path: '/users',
            name: 'users',
            component: NotImplemented,
            meta: {
                title: 'Users',
                currentView: 'users',
                showBackButton: false
            }
        },
        {
            path: '/realtors',
            name: 'realtors',
            component: NotImplemented,
            meta: {
                title: 'Realtors',
                currentView: 'realtors',
                showBackButton: false
            }
        },
        {
            path: '/engineering',
            name: 'engineering',
            component: NotImplemented,
            meta: {
                title: 'Engineering',
                currentView: 'engineering',
                showBackButton: false
            }
        },
        {
            path: '/buildings',
            name: 'buildings',
            component: NotImplemented,
            meta: {
                title: 'Buildings',
                currentView: 'buildings',
                showBackButton: false
            }
        },
        {
            path: '/customers',
            name: 'customers',
            component: NotImplemented,
            meta: {
                title: 'Customers',
                currentView: 'customers',
                showBackButton: false
            }
        },
        {
            path: '/realestates',
            name: 'realestates',
            component: NotImplemented,
            meta: {
                title: 'Real Estates',
                currentView: 'realestates',
                showBackButton: false
            }
        },
        {
            path: '/projects',
            name: 'projects',
            component: NotImplemented,
            meta: {
                title: 'Projects',
                currentView: 'projects',
                showBackButton: false
            }
        },
        {
            path: '/news',
            name: 'news',
            component: NotImplemented,
            meta: {
                title: 'News',
                currentView: 'news',
                showBackButton: false
            }
        },
        {
            path: '/bundles',
            name: 'bundles',
            component: NotImplemented,
            meta: {
                title: 'Bundles',
                currentView: 'bundles',
                showBackButton: false
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: NotImplemented,
            meta: {
                title: 'Contact',
                currentView: 'contact',
                showBackButton: false
            }
        },
        {
            path: '/reports',
            name: 'reports',
            component: NotImplemented,
            meta: {
                title: 'Reports',
                currentView: 'reports',
                showBackButton: false
            }
        },
        {
            path: '/stats',
            name: 'stats',
            component: NotImplemented,
            meta: {
                title: 'Statistics',
                currentView: 'stats',
                showBackButton: false
            }
        },
        {
            path: '/audit',
            name: 'audit',
            component: NotImplemented,
            meta: {
                title: 'Audit',
                currentView: 'audit',
                showBackButton: false
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: NotImplemented,
            meta: {
                title: 'Settings',
                currentView: 'settings',
                showBackButton: false
            }
        },
        // Catch-all route for 404 pages
        {
            path: '/:pathMatch(.*)*',
            redirect: '/agents'
        }
    ]
})

export default router 