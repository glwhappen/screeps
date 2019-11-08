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

            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets) {
                creep.say("ok");
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // 没有东西修理的时候
                creep.wait();
                //creep.moveTo(Game.flags.Flag1.pos); 
            }
        }
        else {
            if(!creep.getEnergyFromContainer()) {
                //creep.getEnergyFromSource();
            }        
        }
    }
};

module.exports = roleBuilder;