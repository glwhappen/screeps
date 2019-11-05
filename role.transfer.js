var roleTransfer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.transfing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transfing = false;
        }
        if(!creep.memory.transfing && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfing = true;
        }
        //console.log(Creep.prototype.target_id);
        if(!creep.memory.transfing) {
              var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.id != Creep.prototype.target_id && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                //console.log("targets[0]:"+ targets[0].store.getUsedCapacity());
                
                if(targets.length > 0 && targets[0].store.getUsedCapacity() > 0) {
                    creep.say("接近资源");
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {stroke: '#ff0000'});
                    }
                } else {
                    creep.say("1找不到资源");
                }
        }
        else {

            // var targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (
            //         structure.structureType == STRUCTURE_EXTENSION ||
            //             structure.structureType == STRUCTURE_SPAWN ||
            //             structure.structureType == STRUCTURE_TOWER ||
            //             structure.id == Creep.prototype.target_id 
            //             ) &&
            //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //     }
            // });
            // if(targets.length > 0) {
            //     //console.log(targets[0]);
            //     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }     
            creep.room.find(FIND_STRUCTURES,)
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    // STRUCTURE_EXTENSION
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // STRUCTURE_TOWER
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // STRUCTURE_SPAWN
                            return (structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else { 
                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                
                                return (structure.id == Creep.prototype.target_id) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                            }
                        });
                        if(targets.length > 0) {
                            creep.say("传送能量");
                            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }

                }
            }
        }
            
    }
};

module.exports = roleTransfer;