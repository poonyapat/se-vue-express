<template>
    <v-card>
        <template v-if="Object.keys(task).length">
            
        <v-card-text>
            <v-text-field v-model="task.name" label="Task name"></v-text-field>
            <v-textarea v-model="task.description" label="Description"></v-textarea>
            <v-select v-model="task.status" :items="taskStatuses" label="Status"></v-select>
            <v-text-field v-model="task.estimatedCost" label="Estimated Cost" type="number" style="width:47%;display:inline-block" class="mr-3"></v-text-field>
            <v-text-field v-model="task.priority" label="Priority" type="number" style="width:47%;display:inline-block"></v-text-field>
            <v-select v-model="task.username" :items="members" label="Person in charge"></v-select>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Save</v-btn>
        </v-card-actions>
        </template>
        <template v-else>
            <v-card-title>Task Information</v-card-title>
            <v-divider></v-divider>
            <v-card-text>No Selection</v-card-text>
        </template>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
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
    }
</script>

<style>

</style>