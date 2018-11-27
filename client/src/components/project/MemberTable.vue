<template>
    <div>
        <v-data-table :headers="headers" :items="project.members" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td> {{props.item}}</td>
                <td class="text-xs-right">
                    <confirm-dialog @confirm="remove(props.item)" :title="confirm.deletion.title" :text="confirm.deletion.text" v-if="!readonly">
                        <v-btn icon v-if="project.username == username">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </confirm-dialog>
                </td>
            </template>
        </v-data-table>
        <v-card class="ma-3" v-if="!readonly">
            <v-layout row class="pa-2">
                <v-text-field v-model="input.user" label="Add Member" :error-messages="error.addMember.show?error.addMember.text: []"
                    clearable></v-text-field>
                <v-btn @click="add()" :dark="!!input.user" :disabled="!input.user">
                    <v-icon>person_add</v-icon>
                </v-btn>
            </v-layout>
        </v-card>
    </div>
</template>
<script>
    import ProjectService from '@/services/projectService'
    import ConfirmDialog from '@/components/ConfirmDialog'
    import Snackbar from '@/components/Snackbar'

    import {
        mapState
    }

    from 'vuex'

    export default {
        components: {
            ConfirmDialog,
            Snackbar
        },
        data() {
            return {
                // project: {},
                headers: [{
                        text: 'Username',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: '',
                        align: 'center',
                        sortable: false,
                        value: 'description'
                    },
                ],
                input: {
                    user: '',
                    projectId: null
                },
                sender: {
                    user: '',
                    projectId: null
                },
                confirm: {
                    deletion: {
                        title: 'Confirm Remove Member',
                        text: 'Please check member before removing them, it may affect to other assignment.<br> when you sure please click confirm'
                    },
                },
                error: {
                    addMember: {
                        text: 'Invalid username',
                        show: false
                    }
                }
            }
        },
        props: {
            project: {
                type: Object,
                required: true
            },
            reload: {
                type: Function,
                required: true
            }
        },
        computed: {
            ...mapState(['username', 'route']),
            readonly(){
                return this.project.status == 'Close'
            }
        },
        methods: {
            async add() {
                try {
                    if (this.input.user != '') {
                        this.input.projectId = this.project.id
                        await ProjectService.addMember(this.input);
                        this.input.user = '';
                        this.reload();
                        this.error.addMember.show = false
                    }
                } catch (error) {
                    this.error.addMember.show = true
                }
            },
            async remove(memberName) {
                this.sender.user = memberName;
                this.sender.projectId = this.project.id
                await ProjectService.removeMember(this.sender);
                this.reload();
            }
        },
    }
</script>
<style></style>