const assert = require('chai').assert;

import TaskService from  '../src/services/taskService.js';
import ProjectService from  '../src/services/projectService.js';

describe('TaskService.js', async function () {
    this.beforeEach(() => {
        try {
            this.project = (ProjectService.create({
                name: "my project",
                description: "make A project"
            })).data
    
        } catch (err) {
            this.error = err
        }
    });


    it('create task by name is "design UI", expected name is "design UI"', () => {
        try {
            this.task = (TaskService.create({
                projectId: this.project.id,
                name: "design UI",
                description: "...",
                estimetedCost: 5,
                priority : 5
            })).data
    
        } catch (err) {
            this.error = err
        }
       
        // assert
        assert.equal("design UI",this.task.name);
    });
    
  
}) 