<template>
    <div>
        <v-data-table :headers="headers" :items="project.members" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td> {{props.item}}
                </td>
                <td class="text-xs-right">
                    <confirm-dialog @confirm="remove(props.item)" :title="confirm.deletion.title" :text="confirm.deletion.text">
                        <v-btn icon v-if="project.username == username">
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </confirm-dialog>
                </td>
            </template>
        </v-data-table>
        <v-form>
            <v-container>
                <v-layout row wrap>
                    <v-text-field solo v-model="input.user" label="Add user" type="text" clearable></v-text-field>
                    <v-btn @click="add()">
                        <v-icon>person_add</v-icon>
                    </v-btn>
                    <snackbar @showBar="showSnackbar" :show="msg" :text="errorMessage.addition.text" />
                </v-layout>
            </v-container>
        </v-form>
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
                        align: 'center',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Position',
                        align: 'center',
                        value: 'description'
                    },
                ],
                input: {
                    user: '',
                    projectId: null,
                },
                sender: {
                    user: '',
                    projectId: null
                },
                confirm: {
                    deletion: {
                        title: 'Confirm Delete Member',
                        text: 'Please check its member, when you sure please click confirm'
                    }
                },
                msg: false, //true = have massage error
                errorMessage: {
                    addition: {
                        text: 'Please check  member it have exist, reduntdant name and this name it not member'
                    }
                }
            }
        },
        computed: {
            ...mapState(['username', ])
        },
        async mounted() {
            const id = this.$store.state.route.params.id
            this.project = (await ProjectService.findOne(id)).data
            this.input.projectId = this.project.id
        },
        methods: {
            refresh: async function () {
                const id = this.$store.state.route.params.id
                this.project = (await ProjectService.findOne(id)).data
            },
            async add() {
                try {
                    if (this.input.user != '') {
                        this.input.projectId = this.project.id;
                        await ProjectService.addMember(this.input);
                        this.input.user = '';
                        this.refresh();

                    }
                } catch (error) {
                    this.msg = true;
                    this.error = error;
                }
            },
            async remove(memberName) {
                this.sender.user = memberName;
                this.sender.projectId = this.project.id;
                await ProjectService.removeMember(this.sender);
                this.refresh();
            },
            showSnackbar: function (tmp) {
                this.msg = tmp;
            },
        },
        watch: {
            msg(value) {
                console.log("in snack bar (out)")
                console.log(value);
            }
        }
    }
</script>
<style></style>