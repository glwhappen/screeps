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
        this.say("填充Spawn和extension");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets) {
            if(this.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }

    },
    // 填充所有 tower
    fillTower() {
        this.say("填充Tower");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets) {
            if(this.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }
    },
    fillStructures() {
        this.say("填充structures");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                // 储存
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if(targets) {
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
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
    }

}