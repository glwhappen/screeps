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
            if(Memory.containersUsedPercentage < 0.3) {
                creep.getEnergyFromStorages();
            } else {
                creep.getEnergyFromContainer(Memory.container.upgrader);
            }
        }
        else {
            if(!creep.fillSpawnEngry()) {
                if(!creep.fillTower()){
                    if(!creep.fillStructureById(Memory.container.upgrader)){
                        if(Memory.containersUsedPercentage > 0.8) {
                            if(!creep.fillStorages()) {
                                // 如果Storages都满了，就休息吧
                                // creep.moveTo(Memory.waitPos.transfer);
                                creep.wait();
                            }
                        } 
                    }
                }
            }
        }
            
    }
};

module.exports = roleTransfer;