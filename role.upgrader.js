var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            //var choose= Game.time % 2;
            if(false) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                
                if(targets.length > 0) {
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {stroke: '#ffaa00'});
                    }
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER  && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                //console.log(targets[0].id);
                var pos = 0;
                for(var i = 0; i < targets.length; i++) {
                    if(targets[i].id ==  Creep.prototype.target_id){
                        pos = i;
                        break;
                    }
                }
                //console.log("pos" + pos);
                if(targets.length > 0 && targets[pos].store.getUsedCapacity()) {
                    creep.say("寻找存储资源");
                    if(creep.withdraw(targets[pos], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[pos], {stroke: '#ffaa00'});
                    }
                } else {
                    creep.say("寻找矿物");
                    var sources = creep.room.find(FIND_SOURCES);

                    if(creep.harvest(sources[creep.memory.sourcesChoose]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[creep.memory.sourcesChoose], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;