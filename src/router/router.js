import Vue from 'vue';
import VueRouter from 'vue-router';
import ThreeDimension from '@/components/ThreeDimension.vue';
import SectionTwo from '@/components/SectionTwo.vue';
import SectionThree from '@/components/SectionThree.vue';
import EarthAndMoon from '@/components/EarthAndMoon.vue';
import GallaryView from '@/components/GallaryView.vue';
import ThreeD_GallaryView from '@/components/3D_GallaryView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component:  ThreeDimension
    },
    {
        path: '/section2',
        component:  SectionTwo
    },
    {
        path: '/section3',
        component: SectionThree
    },
    {
        path: '/earth',
        component: EarthAndMoon
    },
    {
        path: '/gallary',
        component: GallaryView
    },
    {
        path: '/3d_gallary',
        component: ThreeD_GallaryView
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;