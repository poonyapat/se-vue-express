<template>
    <v-card>
        <v-card-title>
            Task Information : {{task.name}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{task.description}}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
                required: true
            },
        },
    }
</script>

<style>

</style>