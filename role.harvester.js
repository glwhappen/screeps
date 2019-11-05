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

            if(!creep.fillStructures()) {
                creep.say("找不到Structures");
            }
        }
    }
};
module.exports = roleHarvester;
