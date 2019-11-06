var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer');
var create = require('role.Create');
const mount = require('./mount')

module.exports.loop = function () {
    mount();
    
    //Creep.prototype.tower1 = 'bea3b81e02da92d';
    Creep.prototype.mode = 3; // 1 - 初始模式，快速发展
    Creep.prototype.transferOpen = false; // 如果为true，需要设置target_id, 为upgrade使用的容器
    Creep.prototype.target_id = '5db941eaa13adf340361f486';
    if(!global.configFlag) {
        console.log("初始化全局config");
        global.configFlag = true;
        global.speedTower = 1; // 塔发射的速度
        global.speedUpgrader = 1; // 升级的速度

    }
    console.log("speed:" + global.speedTower);

    Creep.prototype.sourcesNum = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;
    if(Creep.prototype.allhistT == undefined) Creep.prototype.allhistT = 1;
    
    Creep.prototype.wallhist = (Game.time - 12343942); // 1M = 1000000

    console.log("Wallhist:" + (Game.time - 12343942) );



    var mode = Creep.prototype.mode;
    

    var sumValue = 0; // 记录当前价值的creep
    var cnt = 0;

    // 清理缓存垃圾 并计算最小价值
    for(var name in Memory.creeps) {
        var creep = Game.creeps[name];
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            continue;
        } 
        cnt++;
        if(creep.memory.role == undefined) {
            creep.memory.role = 'harvester';
        }
        if(creep.memory.role == undefined) {
            creep.memory.role = 'harvester';
        }
        if(creep.memory.sourcesChoose == undefined) {
            creep.memory.sourcesChoose = Game.time % Creep.prototype.sourcesNum;
        }
        sumValue += Game.creeps[name].memory.value;
    }
    sumValue /= cnt;
    console.log(sumValue);
    //console.log("当前最小价值:" + minValue);
    if(sumValue < 550) {
        Creep.prototype.mode = 2; 
    } else if(sumValue >= 550 && sumValue < 800) {
        Creep.prototype.mode = 3; 
    } else if(sumValue >= 800) {
        Creep.prototype.mode = 3; 
    }
    if(Game.time % 100 == 0) {
        console.log("当前模式" + Creep.prototype.mode);
    }
    
    create.createTower();
    
    if(Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES) != null) {
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
            if(Game.time % global.speedUpgrader  == 0){
                roleUpgrader.run(creep);
            }
        } else if(role == 'builder') {
            roleBuilder.run(creep);
        } else if(role == 'transfer') {
            roleTransfer.run(creep);
        }
        
    }
}