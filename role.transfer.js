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
            creep.getEnergyFromContainer(Creep.prototype.target_id);
        }
        else {
            if(!creep.fillSpawnEngry()) {
                if(!creep.fillTower()){
                    if(!creep.fillStructureById(Creep.prototype.target_id)){
                        if(!creep.fillStorages()) {

                        }
                    }
                }
            }
            
        }
            
    }
};

module.exports = roleTransfer;