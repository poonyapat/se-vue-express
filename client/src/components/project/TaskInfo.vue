<template>
    <v-card>
        <v-toolbar dense flat class="cyan">
            <v-toolbar-title>
                Task Information
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon @click="$emit('reset')" v-if="Object.keys(copiedTask).length > 2">
                    <v-icon>
                        close
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <template v-if="Object.keys(copiedTask).length > 2">
            <v-card-text>
                <v-text-field v-model="copiedTask.name" label="Task name"></v-text-field>
                <v-textarea v-model="copiedTask.description" label="Description"></v-textarea>
                <v-select v-model="copiedTask.status" :items="taskStatuses" label="Status"></v-select>
                <v-text-field v-model="copiedTask.estimatedCost" label="Estimated Cost" type="number" style="width:47%;display:inline-block"
                    class="mr-3"></v-text-field>
                <v-text-field v-model="copiedTask.priority" label="Priority" type="number" style="width:47%;display:inline-block"></v-text-field>
                <v-select v-model="copiedTask.username" :items="members" label="Person in charge"></v-select>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <confirm-dialog @confirm="save" :title="confirm.save.title" :text="confirm.save.text">
                    <v-btn>Save</v-btn>
                </confirm-dialog>
                <v-spacer></v-spacer>
            </v-card-actions>
        </template>
        <template v-else>
            <v-card-text>No Selection</v-card-text>
        </template>
    </v-card>
</template>

<script>
    import TaskService from '@/services/taskService'
    import ConfirmDialog from '@/components/ConfirmDialog'
    export default {
        data() {
            return {
                copiedTask: {},
                taskStatuses: ['ToDo', 'Designing', 'OnGoing', 'Done'],
                confirm: {
                    save: {
                        title: 'Modification Effect',
                        text: 'This modification may affect to its sub task if you modify its status,<br> Please confirm to save it'
                    }
                }
            }
        },
        props: {
            task: {
                type: Object,
                required: true,
            },
            members: {
                type: Array,
                default: ()=>{return []}
            }
        },
        mounted() {
            this.copiedTask = {}
            Object.assign(this.copiedTask, this.task)
        },
        watch: {
            task: function () {
                this.copiedTask = {status: ''}
                Object.assign(this.copiedTask, this.task)
            }
        },
        components: {
            ConfirmDialog
        },
        methods: {
            save: async function () {
                await TaskService.update(this.copiedTask.id, (({
                    name,
                    description,
                    status,
                    estimatedCost,
                    priority,
                    username
                }) => ({
                    name,
                    description,
                    status,
                    estimatedCost,
                    priority,
                    username
                }))(this.copiedTask))
                this.$emit('reload')
            }
        },
    }
</script>

<style>

</style>