<template>
    <!-- <div> {{project}} </div> -->
    <div>
        {{project}}
        <v-text-field v-model="project.name" label="Project Name" disabled dark></v-text-field>
        <v-textarea v-model="project.description" label="Description" disabled dark></v-textarea>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true
        },
    },
}
</script>

<style>

</style>
