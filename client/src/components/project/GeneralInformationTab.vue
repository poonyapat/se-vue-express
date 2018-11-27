<template>
    <v-card>
        <edit-info-dialog :prop-project="project">
            <v-btn absolute right color="orange lighten-1">
                <v-icon>edit</v-icon>Edit
            </v-btn>
        </edit-info-dialog>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Project Name </h4>
                <div> {{project.name}} </div>
            </div>
        </v-card-title>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Description </h4>
                <div> {{project.description?project.description: '-'}} </div>
            </div>
        </v-card-title>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Status </h4>
                <div>
                    {{project.status}}
                    <span v-if="project.status == 'Open' && project.deadLine">(Deadline: {{project.deadLine}})</span>
                </div>
            </div>
        </v-card-title>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Project Manager </h4>
                <div>
                    {{project.username}}
                </div>
            </div>
        </v-card-title>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Members </h4>
                <div v-for="member in project.members" :key="member">
                    {{member}}
                </div>
                <div v-if="!project.members.length">-</div>
            </div>
        </v-card-title>
        <v-card-title primary-title>
            <div>
                <h4 class="headline mb-0"> Project Created Date </h4>
                <div>
                    {{project.createdAt.slice(0,10)}}
                </div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
import EditInfoDialog from '@/components/project/EditInfoDialog'
    export default {
        props: {
            project: {
                type: Object,
                required: true,
                default: {
                    members: [],
                    createdAt: ''
                }
            },
        },
        components: {
            EditInfoDialog
        }
    }
</script>