<template>
    <v-container grid-list-lg style="height: 100%">
        <v-layout row wrap justify-center>
            <v-flex xs12 sm4 md3>
                <v-card flat dark>
                    <v-avatar size="100%">
                        <v-img :src="user && user.avatarURL?user.avatarURL:defaultAvatar" alt=""/>
                    </v-avatar>
                    <v-card-title primary-title>
                        <h2 class="headline mb-0">
                            {{user?user.username:''}}
                        </h2>   
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-list subheader>
                            <v-list-tile>
                                <h3>Contact</h3>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon>phone</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        phone number: 
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{user?user.phoneNumber:''}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <v-icon>mail</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        E-mail:
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{user? user.email:''}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm7 md8>
                <profile-tabs></profile-tabs>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProfileTabs from '@/components/ProfileTabs'
import UserService from '@/services/userService'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            user: null,
            defaultAvatar: 'https://assets.dryicons.com/uploads/icon/svg/9872/ab3c0a16-6f14-4817-a30b-443273de911d.svg'
        }
    },
    components: {
        ProfileTabs
    },
    computed: {
        ...mapState([
            'username'
        ])
    },
    async mounted(){
        this.user = (await UserService.findOne(this.username)).data
    }
}
</script>

<style>

</style>
