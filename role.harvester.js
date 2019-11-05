var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var tr = Creep.prototype.transferOpen;
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = true;
        }
        
        if(!creep.memory.harvesting) {
            creep.say("挖矿");
            var sources = creep.room.find(FIND_SOURCES);
            var sources2 = creep.pos.findClosestByRange(FIND_SOURCES);
            //console.log(sources2.store.getFreeCapacity());

            if(creep.harvest(sources[creep.memory.sourcesChoose]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourcesChoose], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            //  为true 把采集的物品直接放入到罐子里
            if(tr && creep.memory.value >= 550) {
                creep.say("存资源");
                 //if(creep.transfer())
                //var container = Game.getObjectById('13eab858657f367');
               // var container = Game.room.find(STRUCURT_CONTAINER)[0];
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                // var targets = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_EXTENSION ||
                //             structure.structureType == STRUCTURE_SPAWN ||
                //             structure.structureType == STRUCTURE_TOWER ||
                //             structure.structureType == STRUCTURE_CONTAINER) &&
                //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //     }
                // });

                var targets2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // 储存
                        return (structure.structureType == STRUCTURE_CONTAINER  && structure.id != Creep.prototype.target_id) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                console.log(targets2);
                
                // var targets = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         // 储存
                //         return (structure.structureType == STRUCTURE_CONTAINER  && structure.id != Creep.prototype.target_id) &&
                //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //     }
                // });

                // if(targets.length > 0) {
                //     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                //     }
                if(targets2) {
                    if(creep.transfer(targets2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2, {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                } else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 向额外节点添加燃料
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
                                // 向主城添加燃料
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
                                    // 向塔中添加燃料
                                    return (structure.structureType == STRUCTURE_TOWER) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;

                                }
                            });
                            console.log(targets);
                            if(targets.length > 0) {
                                

                                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            }else {
                                //console.log("builder noting");
                                creep.moveTo(Game.flags.Flag1.pos);
                            }
                        }

                    }
                }
            }
            
        }
    }
};

module.exports = roleHarvester;