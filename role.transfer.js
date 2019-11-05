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
            creep.getEnergyFromSource();
        }
        else {
            if(!creep.fillSpawnEngry()) {
                if(!creep.fillTower()){
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
};

module.exports = roleTransfer;