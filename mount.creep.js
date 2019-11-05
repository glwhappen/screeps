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
    // 从Souorce中获取资源
    getEnergyFromSource() {
        this.say("挖矿2");
        //var sources = creep.room.find(FIND_SOURCES);
        var sources = this.pos.findClosestByRange(FIND_SOURCES, {
            filter:(sources) => {
                return sources.energy > 0;
            }
        });
        //console.log(sources2.store.getFreeCapacity());
        //console.log("矿" + sources + sources.energy);
        //this.say(sources == ERR_NOT_IN_RANGE);
        if(sources) {
            if(this.harvest(sources) == ERR_NOT_IN_RANGE) {
                this.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            this.say("没有矿可以挖了");
        }

        //  if(creep.harvest(sources == ERR_NOT_IN_RANGE) {
        //      creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
        //  }
    }
    // 其他更多自定义拓展
}