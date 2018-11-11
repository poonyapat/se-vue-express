<template>
    <v-card>
        <v-toolbar dense flat class="cyan">
            <v-toolbar-title>
                Task Information
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon @click="$emit('reset')" v-if="Object.keys(copiedTask).length">
                    <v-icon>
                        close
                    </v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <template v-if="Object.keys(copiedTask).length">
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
                <v-btn @click="save">Save</v-btn>
            </v-card-actions>
        </template>
        <template v-else>
            <v-card-text>No Selection</v-card-text>
        </template>
    </v-card>
</template>

<script>
    import TaskService from '@/services/taskService'
    export default {
        data() {
            return {
                copiedTask: {},
                taskStatuses: ['ToDo', 'Designing', 'OnGoing', 'Done', 'Analyzing'],
                members: []
            }
        },
        props: {
            task: {
                type: Object,
                required: true,
            },
        },
        mounted() {
            this.copiedTask = {}
            Object.assign(this.copiedTask, this.task)
        },
        watch: {
            task: function () {
                this.copiedTask = {}
                Object.assign(this.copiedTask, this.task)
            }
        },
        methods: {
            save: async function () {
                console.log(5555)
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

                console.log(666)
                this.$emit('reload')
                console.log(5555)
            }
        },
    }
</script>

<style>

</style>