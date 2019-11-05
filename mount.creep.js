// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

// 自定义的 Creep 的拓展
const creepExtension = {
    // 自定义敌人检测
    checkEnemy() { 
        // 代码实现...
    },
    // 填充所有 spawn 和 extension
    fillSpawnEngry() { 
        // 代码实现...
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
        } else {}

    },
    // 填充所有 tower
    fillTower() {
        // 代码实现...
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
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

        }
    },
    // 从Souorce中获取能量
    getEnergyFromSource() {
        this.say("挖矿2");
        var sources = this.pos.findClosestByRange(FIND_SOURCES, {
            filter:(source) => {
                return source.energy > 0;
            }
        });
        if(sources) {
            if(this.harvest(sources) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        } else {
            this.say("没有矿可以挖了");
            return false;
        }
    },
    // 从structures获取能量
    getEnergyFromStructures() {
        this.say("获取能量2");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER  && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if(targets) {
            //this.say("成功获取能量");
            if(this.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        } else {
            return false;
        }
        // if(targets.length > 0) {
        //     creep.say("从存储获取建造能量");
        //     if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(targets[0], {stroke: '#ffaa00'});
        //     }
        // } else {
            
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[creep.memory.sourcesChoose]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[creep.memory.sourcesChoose], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // }    
        // var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        // console.log("builder:" + targets);
        // //console.log("builder2:" + targets2);
        // //console.log(targets);
        // if(targets) {
        //     creep.say("ok");
        //     if(creep.build(targets) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
        //     }
        // } else {
        //     //console.log("builder noting");
        //     creep.moveTo(Game.flags.Flag1.pos);
        // } 
    }


    // 其他更多自定义拓展
}