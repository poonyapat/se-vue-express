<template>
    <v-dialog v-model="dialog" width="500" class="inline-block">
        <slot slot="activator" />
        <v-card>
            <v-toolbar v-if="title" flat class="primary" dark>
                <v-toolbar-title>
                    {{title}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon @click="dialog = false">close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <div v-html="text"></div>
                <v-text-field v-if="textField" :label="label" @input="input"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round class="primary" @click="$emit('confirm');dialog=false">Confirm</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            title: String,
            text: String,
            textField: Boolean,
            label: String,
        },
        data() {
            return {
                dialog: false
            }
        },
        methods: {
            input(value) {
                this.$emit('input', value)
            }
        }
    }
</script>

<style>

</style>