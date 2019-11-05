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
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >= this.store.getUsedCapacity();
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
    
    fillStructureById(id) {
        this.say("填充升级罐子");
        var targets = Game.getObjectById(id);
        if(targets && targets.store.getFreeCapacity(RESOURCE_ENERGY) >= this.store.getUsedCapacity()) {
            if(this.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            return false;
        }
    },
    // 填充所有 container
    fillContainer(except) {
        console.log(except);
        this.say("填充containers");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                // 储存
                 //Creep.prototype.target_id

                return (structure.structureType == STRUCTURE_CONTAINER && structure.id != except) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >= this.store.getUsedCapacity();
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
    // 填充所有 storage
    fillStorages() {
        this.say("填充storage");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                // 储存
                return (structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) >= this.store.getUsedCapacity();
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
    // 从Souorce中获取能量
    getEnergyFromSource() {
        this.say("挖矿2");
        var sources = this.pos.findClosestByPath(FIND_SOURCES, {
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
    // 从container获取能量
    getEnergyFromContainer(except) {
        this.say("能量container");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.id != except) 
                && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
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
    },
    getEnergyFromStorages() {
        this.say("能量Storages");
        var targets = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE  && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
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