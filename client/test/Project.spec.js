const assert = require('chai').assert;

import ProjectService from  '../src/services/projectService.js';
describe('projectService.js', async function () {
    this.beforeEach(() => {
        try {
            this.project = (ProjectService.create({
                name: "test001",
                description: "test"
            })).data
    
        } catch (err) {
            this.error = err
        }
    });


    it('create project by project name is "test001", expected name is "test001"', () => {
        // assert
        assert.equal("test001",this.project.name);
    });
    
    it('add member into project ,member name is "admin001", expected member name is "admin001"',()=>{
        try {
            this.result = (ProjectService.addMember({
                user: "admin001",
                projectId: this.project.id
            })).data
    
        } catch (err) {
            this.error = err
        }
        assert.equal("admin001",this.project.members[0]);
    });

    it('remove member from project ,member name is "admin001", expected members in project is null',()=>{
        try {
            this.result = (ProjectService.removeMember({
                user: "admin001",
                projectId: this.project.id
            })).data
    
        } catch (err) {
            this.error = err
        }
        assert.equal({},this.project.members);
    });
}) 

    
