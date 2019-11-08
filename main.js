var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer');
var create = require('role.Create');
const mount = require('./mount')

module.exports.loop = function () {
    mount();

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
                formContent +=  "<td><button style='color:#333'>操作</button></td>"
                formContent += "</tr>";
            }
        }
        //+ "<input type='button' value='按钮'></input>"
        //+ "<input type='button' value='按钮'></input>"
        
        formContent += "</table>";


        console.log(formContent);
    }
    
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
       // console.log(containers[i] + " " + containers[i].store.getUsedCapacity());
    }
    //console.log(containersUsedCapacity + " " + containersCapacity);
    global.containersUsedPercentage = containersUsedCapacity / containersCapacity;
    console.log(global.containersUsedPercentage);
    if(global.containersUsedPercentage < 0.4){
        global.speedUpgrader = 5;
       // global.speedTower = 10;
    } else {
        global.speedUpgrader = 1;
    }

    //Creep.prototype.tower1 = 'bea3b81e02da92d';
    Creep.prototype.mode = 3; // 1 - 初始模式，快速发展
    Creep.prototype.transferOpen = false; // 如果为true，需要设置target_id, 为upgrade使用的容器
    Creep.prototype.target_id = '5db941eaa13adf340361f486';
    if(!global.configFlag) {
        console.log("初始化全局config");
        global.configFlag = true;
        global.speedTower = 1; // 塔发射的速度
        global.speedUpgrader = 1; // 升级的速度
        
        Memory.speed = {"tower":1, "upgrader":1};
        Memory.hits = {"wall":40000};
    }
    console.log(Memory.speed.tower);
    //console.log("speed:" + global.speedTower);

    Creep.prototype.sourcesNum = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;
    if(Creep.prototype.allhistT == undefined) Creep.prototype.allhistT = 1;
    
    Creep.prototype.wallhist = 40232; // 1M = 1000000

    var sumValue = 0; // 记录当前价值的creep
    var cnt = 0;

    // 清理缓存垃圾
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            continue;
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
        }
        
    }
}