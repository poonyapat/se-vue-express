<template>
    <v-dialog fullscreen v-model="dialog">
        <slot slot="activator" />
        <v-card>
            <v-toolbar dark>
                <v-btn icon @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Project Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn @click="save" flat>Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field v-model="project.name" label="Project Name" clearable style="max-width:30em"></v-text-field>
                <v-textarea v-model="project.description" label="Description" clearable auto-grow style="max-width:40em"></v-textarea>
                <v-switch :label="`Status: ${project.status}`" v-model="project.status" true-value="Open" false-value="Close"></v-switch>
                <v-date-picker v-model="project.deadLine" landscape></v-date-picker>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import ProjectService from '@/services/projectService'
    export default {
        data() {
            return {
                dialog: false,
                project: {}
            }
        },
        props: {
            propProject: {
                type: Object,
                required: true
            },
        },
        methods: {
            save() {
                ProjectService.update({project: this.project})
                this.dialog = false
            },
        },
        mounted(){
            this.project = this.propProject
        },
        watch: {
            propProject(){
                this.propProject = this.propProject
            }
        }
    }
</script>

<style>
</style>