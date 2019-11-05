var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('采集');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('建造');
        }

        if(creep.memory.building) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            
            console.log("builder:" + targets);
            //console.log("builder2:" + targets2);
            //console.log(targets);
            if(targets) {
                creep.say("ok");
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                //console.log("builder noting");
                creep.moveTo(Game.flags.Flag1.pos);
            }
        }
        else {
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
                if(!creep.getEnergyFromContainer()) {
                    //creep.getEnergyFromSource();
                }        
            }
        }
    }
};

module.exports = roleBuilder;