<template>
    <v-list expand flat dark>
        <!-- {{ skills }} -->
        <v-list-tile 
            v-for="(value, skill) in skills" 
            :key="skill"
            avatar
            :class="'my-3 py-3 '+color(value)"
            @click="0"
        >
            <v-list-tile-content>
              <v-list-tile-title>{{ skill }}</v-list-tile-title>
              <v-list-tile-title> {{value}} </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
import UserService from '@/services/userService'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            skills: [],
            maxLevel: 0
        }
    },
    async mounted() {
        this.skills = (await UserService.findOne(this.username)).data.skills
        for (let skill in this.skills){
            if (this.skills[skill] > this.maxLevel){
                this.maxLevel = this.skills[skill]
            }
        }
    },
    methods: {
        color(level) {
            if (level > 0.75*this.maxLevel){
                return 'success'
            }
            else if (level > 0.5*this.maxLevel){
                return 'info'
            }
            else if (level > 0.25*this.maxLevel){
                return 'warning'
            }
            else{
                return 'error'
            }
        }
    },
    computed: {
        ...mapState([
            'username'
        ])
    },
}
</script>

<style>

</style>
