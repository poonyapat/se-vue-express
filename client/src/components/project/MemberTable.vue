<template>
    <div>
        <v-data-table :headers="headers" :items="project.members" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td> {{props.item}}</td>
                <td class="text-xs-right">
                    <confirm-dialog @confirm="remove(props.item)" :title="confirm.deletion.title" :text="confirm.deletion.text">
                        <v-btn icon v-if="project.username == username">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </confirm-dialog>
                </td>
            </template>
        </v-data-table>
        <v-card class="ma-3">
            <v-layout row class="pa-2">
                <v-autocomplete v-model="input.user" :items="suggestion" item-text="name" label="Add Member" clearable></v-autocomplete>
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
                project: {},
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
                suggestion: ['poonyapat'],
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
            }
        },
        computed: {
            ...mapState(['username', 'route'])
        },
        async mounted() {
            const id = this.route.params.id
            this.project = (await ProjectService.findOne(id)).data
        },
        methods: {
            refresh: async function () {
                const id = this.route.params.id
                this.project = (await ProjectService.findOne(id)).data
            },
            async add() {
                try {
                    if (this.input.user != '') {
                        this.input.projectId = this.project.id
                        await ProjectService.addMember(this.input);
                        this.input.user = '';
                        this.refresh();
                    }
                } catch (error) {
                    this.error = error;
                }
            },
            async remove(memberName) {
                this.sender.user = memberName;
                this.sender.projectId = this.project.id
                await ProjectService.removeMember(this.sender);
                this.refresh();
            },
        },
    }
</script>
<style></style>