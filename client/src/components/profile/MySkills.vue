<template>
    <v-list expand flat dark>
        <!-- {{ skills }} -->
        <v-list-tile 
            v-for="(skill) in sortedSkills" 
            :key="skill.name"
            avatar
            :class="'my-3 py-3 '+color(skill.level)"
            @click="0"
        >
            <v-list-tile-content>
              <v-list-tile-title>{{ skill.name }}</v-list-tile-title>
              <v-list-tile-sub-title> {{ skill.level }} </v-list-tile-sub-title>
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
            sortedSkills: [],
            maxLevel: 0
        }
    },
    async mounted() {
        let skills = (await UserService.findOne(this.username)).data.skills
        for (let skill in skills){
            if (skills[skill] > this.maxLevel){
                this.maxLevel = skills[skill]
            }
            this.sortedSkills.push({'name': skill, 'level': skills[skill]})
        }
        this.sortedSkills.sort((a,b)=> {
            return b.level - a.level
        })
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
        ]),
    },
}
</script>

<style>

</style>
