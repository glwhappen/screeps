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
            creep.getEnergyFromSource();
        }
        else {

            if(!creep.fillContainer(Memory.container.upgrader)) {
                // 不需要填充就会进来
                if(!creep.fillSpawnEngry()) {
                    if(Memory.containersUsedPercentage > 0.7 && !creep.fillStorages()) {
                        
                    }
                }
            }
        }
    }
};
module.exports = roleHarvester;
