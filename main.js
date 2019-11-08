var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer');
var create = require('role.Create');
const mount = require('./mount')

module.exports.loop = function () {
    mount();
    /*******全局配置-开始 */
    Creep.prototype.mode = 3; // 1 - 初始模式，快速发展
    if(!global.configFlag) {
        console.log("初始化全局config");
        global.configFlag = true;
        Memory.speed = {"tower":1, "upgrader":1};
        Memory.hits = {"wall":40000};
        Memory.container = {"upgrader":"5db941eaa13adf340361f486"};
        Memory.sources = {"E29N36":['5bbcaea19099fc012e639581','5bbcaea19099fc012e639580']};
        Memory.waitPos = {"builder":Game.flags.Flag1.pos, "transfer":Game.flags.Flag2.pos};
        
    }
    Memory.has = {"build":Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length};
    /********全局配置-结束 */

    if(!global.menuFlag){
        global.menuFlag = true;
        var formContent = "<table border='1' cellspacing='0'>";
        formContent += "<tr><td>名称</td><td>id</td><td>操作</td></tr>";
        for(var name in Memory.creeps){
            var creep = Game.creeps[name];
            if(creep) {
                formContent += "<tr>";
                formContent += "<td> " + creep.name + " </td>";
                formContent += "<td> " + creep.id + " </td>";
                formContent +=  "<td><button style='color:#333' onclick='console.log(123)'>操作</button></td>"
                formContent += "</tr>";
            }
        }
        //+ "<input type='button' value='按钮'></input>"
        //+ "<input type='button' value='按钮'></input>" //Game.creeps[" + creep.name + "].say(123)
        
        formContent += "</table>";
        console.log(formContent);
    }
    /**********计算当前container的容量占比 开始******* */
    var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);
        }
    });
    var containersUsedCapacity = 0;
    var containersCapacity = 0;
    for(var i in containers) {
        containersUsedCapacity += containers[i].store.getUsedCapacity();
        containersCapacity += containers[i].store.getCapacity()
    }
    Memory.containersUsedPercentage = containersUsedCapacity / containersCapacity;
    if(Memory.containersUsedPercentage < 0.4){
        Memory.speed.upgrader = 5;
    } else {
        Memory.speed.upgrader = 1;
    }
    /**********计算当前container的容量占比 结束******* */

    // 清理缓存垃圾
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            continue;
        } 
        if(Game.creeps[name].ticksToLive <= 20) {
            // 设置为死亡状态，把身上的能量存起来
            Game.creeps[name].role = "death";
        }
    }

    create.createTower();
    
    if(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length != 0) {
        global.builderStatus = true;
        create.createBuilder();
    } else {
        global.builderStatus = false;
    }

    create.createUpgrader();
    create.createTransfer();
    create.createHarvester();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if(role == 'harvester') {
            roleHarvester.run(creep);
        } else if(role == 'upgrader') {
            if(Game.time % Memory.speed.upgrader  == 0){
                roleUpgrader.run(creep);
            }
        } else if(role == 'builder') {
            roleBuilder.run(creep);
        } else if(role == 'transfer') {
            roleTransfer.run(creep);
        } else if(role == 'death') {
            creep.fillStorages();
        }
        
    }
}