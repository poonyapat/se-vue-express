<template>
    <v-tabs
        v-model="currentItem"
        fixed-tabs
        dark
        slider-color="white"
        icons-and-text
        show-arrows
    >
        <v-tab
            v-for="item in items"
            :href="'#tab-' + item.name"
            :key="item.name"
        >
            {{ item.name }}
            <v-icon large> {{ item.icon }} </v-icon>
        </v-tab>

        <v-tabs-items 
            :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'mx-5': $vuetify.breakpoint.mdAndUp}">
            <v-tab-item
                v-for="item in items"
                :id="'tab-' + item.name"
                :key="item.name"
            >
                <component :is="item.component"/>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import Projects from '@/components/profile/Projects'
import Assignments from '@/components/profile/Assignments'
import MySkills from '@/components/profile/MySkills'
export default {
    data() {
        return {
            currentItem: 'tab-Web',
            items: [
                {name:'Projects', icon:'dashboard', component: 'projects'}, 
                {name:'Assignments', icon:'assignment', component: 'assignments'},
                {name:'My Skills', icon:'view_list', component: 'my-skills'}
            ]
        }
    },
    components: {
        Projects, Assignments, MySkills
    }
}
</script>

<style>

</style>
