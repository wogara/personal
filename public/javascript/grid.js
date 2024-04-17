var button = document.getElementById("generate");
var button2 = document.getElementById("generate2");
var button3 = document.getElementById("generate3");
var button4 = document.getElementById("generate4");
var numBlocks = 3000;
var blockSize = 20;
var mode = "s";
var start;
var end;
function getDimensions(v) {
    //returns array LxW
    var width = window.innerWidth/blockSize;
    width = Math.floor(width);
    var totalSquares = v - (v%(Math.floor(window.innerWidth/blockSize)));
    return [Math.floor(totalSquares/width), width];
}
function block(row,col,visited,prevRow, prevCol, identifier, isWall, gVal, hVal, fVal) {
    this.r = row;
    this.c = col;
    this.v = visited;
    this.pr = null;
    this.pc = null;
    this.id = identifier;
    this.w = isWall;
    this.g = gVal;
    this.h = hVal;
    this.f = fVal;
}

var graph = new Array(numBlocks); 

function createGraph(v) {
    var dimensions = this.getDimensions(v);
    for (var i = 0; i < dimensions[0]; i++){
        graph[i] = new Array(dimensions[1]);
        for (var y = 0; y < dimensions[1]; y++){
            var id = y + (dimensions[1]*i);
            graph[i][y] = new block(i,y,0,null,null,id, 0, 0, 0, 0);
        }
    } 
}

createGraph(numBlocks);
function clearDivs(v) {
    const subtract = v%(Math.floor(window.innerWidth/blockSize));
    for (var i = 0; i < (v-subtract); i++){
        var cell = document.getElementById(String(i));
        cell.classList.remove('red');
        cell.classList.remove('green');
        cell.classList.remove('blue');
        cell.classList.remove('yellow');
        cell.classList.remove('grey');
    }

}
function genDivs(v) {
    //builds the grid
    const body = document.body;
    const subtract = v%(Math.floor(window.innerWidth/blockSize));
    var row = document.createElement("div");
    row.className = "row";
    for (var i = 0; i < (v-subtract); i++){
        var cell = document.createElement("div");
        cell.className = "gridsquare";
        //cell.innerText = (i);
        cell.id = i;
//        cell.classList.remove("red");
//        cell.classList.remove("green");
        cell.addEventListener("dragover", function(){
            if (mode == "w"){
                this.classList.add('blue');
                var r = Math.floor(Number(this.id)/getDimensions(v)[1]);
                var c = Number(this.id) - getDimensions(v)[1]*r;
                graph[r][c].w = 1;
            }

            
        });
        cell.addEventListener("click", function(){
            var r = Math.floor(Number(this.id)/getDimensions(v)[1]);
            var c = Number(this.id) - getDimensions(v)[1]*r;

            if (mode == "s"){
                start = graph[r][c];
                this.classList.add('green');
                mode = "e";
            }else if (mode == "e"){
                end = graph[r][c];
                this.classList.add('red');
                mode = "w";
            }else{
                this.classList.add('blue');
                graph[r][c].w = 1;
            }

        });

        row.appendChild(cell);
    }
    body.appendChild(row);
}


genDivs(numBlocks);

function addBlack(block) {
    document.getElementById(String(block.id)).classList.add('black');;

}
function addYellow(block) {
    document.getElementById(String(block.id)).classList.add('yellow');

}

function addGrey(block) {
    document.getElementById(String(block.id)).classList.add('grey');;

}


function hasLeftNeighbor(block) {
    var col = block.c;
    
    if ((col - 1) >= 0){
        return true;
    }else{
        return false;
    }

}
function hasRightNeighbor(block) {
    var col = block.c;
    var numCols = getDimensions(numBlocks)[1] - 1;
    
    if ((col + 1) <= numCols){
        return true;
    }else{
        return false;
    }

}
function hasTopNeighbor(block) {
    var row = block.r;
    if ((row - 1) >= 0){
        return true;
    }else{
        return false;
    }

}

function hasBottomNeighbor(block) {
    var row = block.r;
    var numRows = getDimensions(numBlocks)[0] - 1;
    
    if ((row + 1) <= numRows){
        return true;
    }else{
        return false;
    }

}

function getLeftNeighbor(block) {
    var col = block.c - 1;
    return graph[block.r][col];

}
function getRightNeighbor(block) {
    var col = block.c + 1;
    return graph[block.r][col];

}

function getTopNeighbor(block) {
    var row = block.r - 1;
    return graph[row][block.c];

}
function getBottomNeighbor(block) {
    var row = block.r + 1;
    return graph[row][block.c];

}
function bfs(start) {
    var queue = [];
    queue.push(start);
    var count = 0;
    var visited = [];
    while(queue.length >= 1){
        var currNode = queue.shift();
        if (currNode.v == 0) {
            if (hasLeftNeighbor(currNode)){
                var leftNeighbor = getLeftNeighbor(currNode);
                if (leftNeighbor.v == 0){
                    queue.push(leftNeighbor);
                }
            }
            if (hasRightNeighbor(currNode)){
                var rightNeighbor = getRightNeighbor(currNode);
                if (rightNeighbor.v == 0){
                    queue.push(rightNeighbor);

                }
            }
            if (hasTopNeighbor(currNode)){
                var topNeighbor = getTopNeighbor(currNode);
                if (topNeighbor.v == 0){
                    queue.push(topNeighbor);

                }
            }
            if (hasBottomNeighbor(currNode)){
                var bottomNeighbor = getBottomNeighbor(currNode);
                if (bottomNeighbor.v == 0){
                    queue.push(bottomNeighbor);
                }
            }
            currNode.v = 1;
            visited.push(currNode);
            count = count + 1;
        }
        
    }
}
function constructShortestPath(end){
    var currNode = end;
    var prevNode = graph[end.pr][end.pc];
    var path = [];
    path.push(currNode);
    while (currNode.pr != null){
        currNode = graph[currNode.pr][currNode.pc];        
        path.push(currNode);


    }
    var count = path.length - 1;
    var id = null;
    function color() {
        clearInterval(id);
        id = setInterval(frame, 20);
        function frame() {
            if (count == 0){
                clearInterval(id);
            }else{
                document.getElementById(String(path[count].id)).classList.add('yellow');
                count--;
            }
            //console.log('yello');
        }
    }
    color();
}
function colorVisited(visited,end,found) {
    var v = visited;
    var e = end;
    var count = 0;
    var id2 = null;
    function color2() {
        clearInterval(id2);
        id2 = setInterval(frame2, 5);
        function frame2() {
            if (count == v.length && found == 1){
                clearInterval(id2);
                if (found == 1){
                    constructShortestPath(e);
                }
            }else{
                console.log(v[count].id);
                document.getElementById(String(v[count].id)).classList.add('grey');
                count++;
            }
            //console.log('visited');

        }
    }
    color2();

}
function shortestPathDFS(start, end){
    var queue = [];
    queue.push(start);
    var count = 0;
    var visited = [];
    var found = 0;
    while(queue.length >= 1){
        var index = queue.length - 1;
        var currNode = queue[index];
        queue.splice(index,1);
        if (currNode.v == 0) {
            if (hasLeftNeighbor(currNode)){
                var leftNeighbor = getLeftNeighbor(currNode);
                if (leftNeighbor.v == 0 && leftNeighbor.w == 0){
                    leftNeighbor.pr = currNode.r;
                    leftNeighbor.pc = currNode.c;
                    queue.push(leftNeighbor);
                }
            }
            if (hasRightNeighbor(currNode)){
                var rightNeighbor = getRightNeighbor(currNode);
                if (rightNeighbor.v == 0 && rightNeighbor.w == 0){
                    rightNeighbor.pr = currNode.r;
                    rightNeighbor.pc = currNode.c;

                    queue.push(rightNeighbor);

                }
            }
            if (hasTopNeighbor(currNode)){
                var topNeighbor = getTopNeighbor(currNode);
                if (topNeighbor.v == 0 && topNeighbor.w == 0){
                    topNeighbor.pr = currNode.r;
                    topNeighbor.pc = currNode.c;

                    queue.push(topNeighbor);

                }
            }
            if (hasBottomNeighbor(currNode)){
                var bottomNeighbor = getBottomNeighbor(currNode);
                if (bottomNeighbor.v == 0 && bottomNeighbor.w == 0){
                    bottomNeighbor.pr = currNode.r;
                    bottomNeighbor.pc = currNode.c;

                    queue.push(bottomNeighbor);
                }
            }
            currNode.v = 1;
    //        addGrey(currNode);
            visited.push(currNode);
            count = count + 1;
            if (currNode.r == end.r && currNode.c == end.c){
                found = 1;
                break;
            }
        }
        
    }
    console.log("visited is " + visited);
    colorVisited(visited,end,found);
    //constructShortestPath(end);

}
function shortestPathBFS(start, end){
    var queue = [];
    queue.push(start);
    var count = 0;
    var visited = [];
    var found = 0;
    while(queue.length >= 1){
        var currNode = queue.shift();
        if (currNode.v == 0) {
            if (hasLeftNeighbor(currNode)){
                var leftNeighbor = getLeftNeighbor(currNode);
                if (leftNeighbor.v == 0 && leftNeighbor.w == 0){
                    leftNeighbor.pr = currNode.r;
                    leftNeighbor.pc = currNode.c;
                    queue.push(leftNeighbor);
                }
            }
            if (hasRightNeighbor(currNode)){
                var rightNeighbor = getRightNeighbor(currNode);
                if (rightNeighbor.v == 0 && rightNeighbor.w == 0){
                    rightNeighbor.pr = currNode.r;
                    rightNeighbor.pc = currNode.c;

                    queue.push(rightNeighbor);

                }
            }
            if (hasTopNeighbor(currNode)){
                var topNeighbor = getTopNeighbor(currNode);
                if (topNeighbor.v == 0 && topNeighbor.w == 0){
                    topNeighbor.pr = currNode.r;
                    topNeighbor.pc = currNode.c;

                    queue.push(topNeighbor);

                }
            }
            if (hasBottomNeighbor(currNode)){
                var bottomNeighbor = getBottomNeighbor(currNode);
                if (bottomNeighbor.v == 0 && bottomNeighbor.w == 0){
                    bottomNeighbor.pr = currNode.r;
                    bottomNeighbor.pc = currNode.c;

                    queue.push(bottomNeighbor);
                }
            }
            currNode.v = 1;
            //addGrey(currNode);
            visited.push(currNode);
            count = count + 1;
            if (currNode.r == end.r && currNode.c == end.c){
                found = 1;
                break;
            }
        }
        
    }
    colorVisited(visited,end,found);
    //constructShortestPath(end);

}


function shortestPathAStar(start, end){
    var openList = [];
    var closedList = [];
    openList.push(start);
    var count = 0;
    var visited = [];
    var found = 0;
    while(openList.length >= 1){
        var currNode = openList[0];
        var currIndex = 0;
        currNode.v = 1;
        
        for (var i = 0; i < openList.length; i++){
            if (openList[i].f < currNode.f){
                currNode = openList[i];
                currIndex = i;
            }


        }

        openList.splice(currIndex,1);
        closedList.push(currNode);
        console.log("hm");
        if (currNode == end) {
            console.log("foundloop");
            found = 1;
            break;
        }

        var children = [];
        if (hasLeftNeighbor(currNode) && getLeftNeighbor(currNode).w == 0){
            children.push(getLeftNeighbor(currNode));
        }
        if (hasRightNeighbor(currNode) && getRightNeighbor(currNode).w == 0){
            children.push(getRightNeighbor(currNode));
        }
        if (hasTopNeighbor(currNode) && getTopNeighbor(currNode).w == 0){
            children.push(getTopNeighbor(currNode));
        }
        if (hasBottomNeighbor(currNode) && getBottomNeighbor(currNode).w == 0){
            children.push(getBottomNeighbor(currNode));
        }
        //visited.push(currNode);
        for (var i = 0; i < children.length; i++){
            //visited.push(children[i]);
            if (closedList.includes(children[i])){
                continue;
            }
            children[i].g = currNode.g + (Math.pow((currNode.r - children[i].r),2) + Math.pow((currNode.c - children[i].c),2));
            children[i].h = Math.pow((children[i].r-end.r),2) + Math.pow((children[i].c-end.c),2);
            children[i].f = children[i].g + children[i].h;

            for (var j = 0; j < openList.length; j++){
                if (children[i] == openList[j] && children[i].g > openList[j]){
                    continue;
                }
            }
            children[i].pr = currNode.r;
            children[i].pc = currNode.c;
           // if (children[i].v == 0){
            if (!openList.includes(children[i])){
//                children[i].v = 1; 
                openList.push(children[i]);
                
                
 //           }else{
 //               visited.push(children[i]);
            }
            //openList.push(children[i]); 
        }
        if (!visited.includes(currNode)){
            
            visited.push(currNode);
        }
        
    }
    if (found == 1){
        console.log('found');
    }
    colorVisited(visited,end,found);
    //constructShortestPath(end);
}



button.addEventListener("click",function(){
    shortestPathBFS(start,end)
});
button2.addEventListener("click",function(){
    shortestPathDFS(start,end)
});
button3.addEventListener("click",function(){
    shortestPathAStar(start,end);
});
button4.addEventListener("click",function(){
//#    mode = "s";
//    start = null;
 //   end = null;
  //  createGraph(numBlocks);
   // clearDivs(numBlocks);
    location.reload(true);
});

