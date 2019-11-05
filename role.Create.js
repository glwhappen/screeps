var getCnt = function(need){
    //var len = conneed.length;
    var ret = 0;
    for(var n in need){
        if(need[n] == WORK) {
            ret += 100;
        } else {
            ret += 50;
        }
    }
    return ret;
}

// 创建harvester
module.exports.createHarvester = function() {
    var tr = Creep.prototype.transferOpen;
    var mode = Creep.prototype.mode;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var len = harvesters.length;
    var role = 'harvester';
    var id = Creep.prototype[role + "Id"];
    var newName = role + Game.time;
    var sourcesNum = Creep.prototype.sourcesNum;
    var need = [];
    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    console.log(extensions.length);
    console.log(mode);
    if(mode == 1) {
        // 初级模式，快速发展，适合扩展为0的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            need = [WORK,WORK,CARRY,MOVE]; // 300
        } else if(len < 3) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
        } else if(len < 4) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
        }
    } else if(mode == 2) {
        // 精简部队，适合扩展为5的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            need = [WORK,WORK,CARRY,MOVE]; // 300
        } else if(len < 3) {
            if(tr) {
                need = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]; // 550
            } else {
                if(extensions.length >= 11 && extensions.length < 15) {
                    need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 850
                }
                else if(extensions.length >= 15) {
                    need = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 950
                } else {
                    need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
                }
                
            }
        }
    } else if(mode == 3) {
        // 精简部队，适合扩展为5 - 10的情况 550 - 800
        if(len < 1) {
            need = [WORK,WORK,CARRY,MOVE]; // 300
        } else if(len < 4) {
            if(tr) {
                need = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]; // 550
            } else {
                if(extensions.length >= 11 && extensions.length < 15) {
                    need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 850
                } else if(extensions.length >= 15) {
                    need = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 1050
                } else {
                    need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
                }
            }
        }
    } else if(mode == 4) {
        // 强化部队，适合扩展为15-20的情况 1050-
        if(len < 1) {
            need = [WORK,CARRY,CARRY,MOVE,MOVE]; // 300
        } else if(len < 2) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1000
        } else if(len < 3) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1300
        }
    }
    if(Game.spawns['Spawn1'].canCreateCreep(need) == 0) {
        Game.spawns['Spawn1'].spawnCreep(need, newName + "_" + getCnt(need), {memory: {role: role, value: getCnt(need),beginTime: Game.time,id:id,sourcesChoose: Game.time%sourcesNum}});
        Creep.prototype[role + "Id"]++;
    }  
    //need = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 800
    // if(len < 1) {
    //     need = [WORK,CARRY,MOVE]; // 200
    // } else if(len < 2) {
    //     if(true) {
    //         need = [WORK,WORK,CARRY,MOVE]; // 300
    //     } else {
    //         need = [WORK,WORK,CARRY,MOVE]; // 300
    //     }
    // } else if(len < 3) {
    //     if(true) {
    //         //need = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 450
    //         need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]; // 750
    //     } else {
    //         need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
    //     }
    // } 
    //else if(len < 4) {
     //   if()
        //var need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
        //need = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 800
   // }

}




// 创建upgrader
module.exports.createUpgrader = function(){
    var tr = Creep.prototype.transferOpen;
    var mode = Creep.prototype.mode;
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var len = upgraders.length;
    var role = 'upgrader';
    var id = Creep.prototype[role + "Id"];
    var newName = role + Game.time;
    var sourcesNum = Creep.prototype.sourcesNum;
    var need = [];
    if(mode == 1) {
        // 初级模式，快速发展，适合扩展为0的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            need = [WORK,WORK,CARRY,MOVE]; // 300
        } else if(len < 3) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
        } else if(len < 4) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
        }
    } else if(mode == 2) {
        // 精简部队，适合扩展为5的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            if(tr) {
                need = [WORK,WORK,WORK,CARRY,WORK,MOVE]; // 500
            } else {
                need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
            }
        }
    } else if(mode == 3) {
        // 精简部队，适合扩展为5 - 10的情况
        if(len < 1) {
            if(tr) {
                need = [WORK,WORK,WORK,CARRY,WORK,MOVE]; // 500
            } else {
                need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
            }
        } else if(len < 2) {
            if(tr) {
                need = [WORK,WORK,WORK,WORK,CARRY,WORK,MOVE]; // 600
            } else {
                need = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 900
            }
        }
    } else if(mode == 4) {
        // 强化部队，适合扩展为15-20的情况 1050-
        if(len < 1) {
            need = [WORK,CARRY,CARRY,MOVE,MOVE]; // 300
        } else if(len < 2) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1000
        } else if(len < 3) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1300
        }
    }
    if(Game.spawns['Spawn1'].canCreateCreep(need) == 0) {
        Game.spawns['Spawn1'].spawnCreep(need, newName + "_" + getCnt(need), {memory: {role: role, value: getCnt(need),beginTime: Game.time,id:id,sourcesChoose: Game.time%sourcesNum}});
        Creep.prototype[role + "Id"]++;
    }  
        
}
// 创建builders
module.exports.createBuilder = function(){
    var mode = Creep.prototype.mode;
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var len = builders.length;
    var role = 'builder';
    var id = Creep.prototype[role + "Id"];
    var newName = role + Game.time;
    var sourcesNum = Creep.prototype.sourcesNum;
    var need = [];
    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    if(mode == 1) {
        // 初级模式，快速发展，适合扩展为0的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            need = [WORK,WORK,CARRY,MOVE]; // 300
        } else if(len < 3) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
        } else if(len < 4) {
            need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]; // 550
        }
    } else if(mode == 2) {
        // 精简部队，适合扩展为5的情况
        if(len < 1) {
            need = [WORK,CARRY,MOVE]; // 200
        } else if(len < 2) {
            if(extensions.length >= 11) {
                need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 800
            } else {
                need = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 500
            }
            //need = [WORK,WORK,CARRY,MOVE]; // 300
            
        }
    } else if(mode == 3) {
        // 精简部队，适合扩展为10的情况
        if(len < 1) {
            if(extensions.length >= 15) {
                need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; // 900
            } else {
                need = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]; // 700
            }
        }
    } else if(mode == 4) {
        // 强化部队，适合扩展为15-20的情况 1050-
        if(len < 1) {
            need = [WORK,CARRY,CARRY,MOVE,MOVE]; // 300
        } else if(len < 2) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1000
        } else if(len < 3) {
            need = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1300
        }
    }
    if(Game.spawns['Spawn1'].canCreateCreep(need) == 0) {
        Game.spawns['Spawn1'].spawnCreep(need, newName + "_" + getCnt(need), {memory: {role: role, value: getCnt(need),beginTime: Game.time,id:id,sourcesChoose: Game.time%sourcesNum}});
        Creep.prototype[role + "Id"]++;
    }  
}

//transfer
module.exports.createTransfer = function() {
    var tr = Creep.prototype.transferOpen;
    var mode = Creep.prototype.mode;
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    var len = transfers.length;
    var role = 'transfer';
    var id = Creep.prototype[role + "Id"];
    var newName = role + Game.time;
    var sourcesNum = Creep.prototype.sourcesNum;
    var need = [];

    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    //console.log('Spawn has '+extensions.length+' extensions available');

    if(tr || extensions.length >= 10) {
        if(len < 2) {
            if(extensions.length >= 20) {
                need = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1050
            } else if(extensions.length >= 15) {
                need = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 750
            } else {
                need = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 600
            }
            
        } 
        //else if(len < 2) {
            //need = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 600
        //}
        if(Game.spawns['Spawn1'].canCreateCreep(need) == 0) {
            Game.spawns['Spawn1'].spawnCreep(need, newName + "_" + getCnt(need), {memory: {role: role, value: getCnt(need),beginTime: Game.time,id:id,sourcesChoose: Game.time%sourcesNum}});
            Creep.prototype[role + "Id"]++;
        }  
    }
}

module.exports.createTower = function() {
    var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });
    if(targets.length > 0) {
        var tower = targets[0];
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(Game.time % Creep.prototype.towerSpeed != 0 ? FIND_MY_STRUCTURES:FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == "constructedWall" || structure.structureType == "rampart" ? structure.hits < Creep.prototype.wallhist : structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
               console.log("type:" + closestDamagedStructure.structureType);
                //console.log("type:" + closestDamagedStructure.hits);
                tower.repair(closestDamagedStructure);
            }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }    
        var tower = targets[1];
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(Game.time % Creep.prototype.towerSpeed != 0 ? FIND_MY_STRUCTURES:FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == "constructedWall" || structure.structureType == "rampart" ? structure.hits < Creep.prototype.wallhist : structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
               console.log("type:" + closestDamagedStructure.structureType);
                //console.log("type:" + closestDamagedStructure.hits);
                tower.repair(closestDamagedStructure);
            }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }  
    }
}