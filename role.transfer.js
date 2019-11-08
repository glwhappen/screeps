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
            if(global.containersUsedPercentage < 0.3) {
                creep.getEnergyFromStorages();
            } else {
                creep.getEnergyFromContainer(Creep.prototype.target_id);
            }
        }
        else {
            if(!creep.fillSpawnEngry()) {
                if(!creep.fillTower()){
                    if(!creep.fillStructureById(Creep.prototype.target_id)){
                        if(global.containersUsedPercentage > 0.7 && !creep.fillStorages()) {

                        } else {
                            creep.moveTo(Game.flags.Flag1.pos);
                        }
                    }
                }
            }
        }
            
    }
};

module.exports = roleTransfer;