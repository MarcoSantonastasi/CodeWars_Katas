// https://www.codewars.com/kata/the-lift/train/javascript

// My solution

var theLift = function(queues, capacity) {
  let building = queues.slice().map((queue, floor) => queue.filter(person => person != floor))
  let cabin = []
  let stopsQueue = []
  let currentFloor = 0
  let direction = 1
  let stops = []

  while ((building.some(floor => floor.length > 0) || cabin.length > 0)) {
    cabin.forEach(person => stopsQueue.push(person))
    building.forEach((queue, floor) => { if (queue.some(person => (person - floor) * direction > 0)) { stopsQueue.push(floor) } })
    stopsQueue = [...new Set(stopsQueue)].sort((a, b) => (a - b) * direction)

    while (stopsQueue.length > 0) {
      currentFloor = stopsQueue.shift()
      let queue = building[currentFloor]
      let isStop = false
      if (cabin.some(person => person == currentFloor)) {
        cabin = cabin.filter(person => person != currentFloor)
        isStop = true
      }
      if (queue.some(person => (person - currentFloor) * direction > 0)) {
        queue.forEach(
          (person, position) => {
            if (((person - currentFloor) * direction > 0) && (cabin.length < capacity)) {
              cabin.push(person)
              stopsQueue.push(person)
              queue[position] = null
            }
        })
        while (queue.indexOf(null) > -1) { queue.splice(queue.indexOf(null), 1) }
        stopsQueue = [...new Set(stopsQueue)].sort((a, b) => (a - b) * direction)
        isStop = true
      }
      if(isStop && stops[stops.length-1] !=currentFloor) stops.push(currentFloor)
    }
    direction = ~direction | 1
  }
  if (stops[stops.length - 1] != 0) stops.push(currentFloor = 0)
  if (stops[0] != 0) stops.unshift(0)

  return stops
}

console.log(work([[3, 3, 3, 3, 3, 3], [], [], [], [], [4, 4, 4, 4, 4, 4], []], 5))

// OFFICIAL SOULUTION

var theLift = function(queues, capacity) {
 
  let level = 0;
  let direction = -1; // +1 | -1
  let visited = [0];
  let guests = [];
  
  // reverse level arrays to go backwards and keep prio (looping backwards because of removing indexes)
  queues = queues.map(queue => queue.reverse());
  
  do {
    let stop = false;

    // change direction
    if (level === (queues.length-1) || level === 0) {
      direction*=-1;
    }

    // step out
    if (guests.length > 0) {
      for (let i=(guests.length-1); i>=0; i--) {
        if (guests[i] === level) {
          guests.splice(i,1);
          stop = true;
        }
      }
    }
    
    // step in (only guests going in this direction
    if (queues[level].length > 0) {
        for (let i = (queues[level].length-1); i>=0; i--) {
          let dest = queues[level][i];
          if ((direction > 0 && dest > level) || (direction < 0 && dest < level)) {
            stop = true;
            if (guests.length < capacity) {
              guests = guests.concat(queues[level].splice(i,1)); 
            }
          }
        }        
    }
    
    if (stop && visited[visited.length-1] !== level) {
      visited.push(level);
    }
    
    // go up/down
    level+= direction;

  } while( queues.reduce((a,c) =>  a+c.length, 0) > 0 || guests.length > 0 ); // as long people are waiting
  
  // return to ground floor
  if (visited[ visited.length - 1 ] !== 0) {
    visited.push(0);
  }
  
  return visited;
}


// Test cases

var myAnswer = function(queues, capacity) {
  
  /*
   * Directions
   */
  const Direction = { UP:1, DOWN:-1 }
  
  
  /** Lift ctor. 
   *
   * @param maxPersons lift capacity
   */
  this.Lift = function(maxPersons) {
  
    this.stoppedAt = [0];
    this.passengers = [];
    this.capacity = maxPersons;
    this.direction = Direction.UP;
    this.curFloor = 0;
    
    /** @return is the lift full? */
    this.isFull = function() {
      return this.passengers.length == this.capacity
    }
    
    /** @return is the lift empty? */
    this.isEmpty = function() {
        return this.passengers.length == 0;
    }  
    
    /** @return what floor is the lift on now */
    this.currentFloor = function() {
      return this.curFloor;
    }  
  
    /** Move to the specified floor. */
    this.gotoFloor = function(floor) {
      if (this.curFloor == floor) {
        //console.log(`Lift: >>>>>>>>>> Already on floor ${this.curFloor} so moving nowhere!`);            
      } else {
        //console.log(`Lift: >>>>>>>>>> Moving from floor ${this.curFloor} to floor ${floor}`);            
        this.curFloor = floor; // change floors...
        this.stoppedAt.push(floor); // ...and remember stopping here
      }
    }
    
    /** @return does anybody in the lift want to get off at this floor? */
    this.wantToGetOff = function(floor) {
      return this.passengers.includes(floor);
    }  
    
    /**
     * Let anybody off who wants to get off at this floor.
     *
     * @param floor where lift is stopped
     * @return did anybody get off?
     */
    this.peopleGetOff = function(floor) {
      var countBefore = this.passengers.length;
      var after = []    
      for (var person of this.passengers) {
        if (person != floor) after.push(person);
      }
      this.passengers = after;
      var anybodyGotOff = countBefore != this.passengers.length;
      if (anybodyGotOff) {
        //console.log(`Lift: ${countBefore - this.passengers.length} people got off at floor ${floor}`);      
        //console.log(`Lift: Remaining passengers ${this.passengers}`);      
      }
      return anybodyGotOff;
    }  
    
    /**
     * Let anybody on who wants to get on at this floor (so long as there is room in the lift!).
     *
     * @param queue the queue for lift on this floor (queue may have people wanting to go UP or DOWN)
     * @return the remaining queue after people have got on
     */
    this.peopleGetOn = function(queue) {
      var space = this.capacity - this.passengers.length; // space remaining in the lift
      var entered = [];
      var remaining = [];
      for (var person of queue) {
        
        if (this.dir == Direction.UP) { // Lift heading UP
          if (person > this.curFloor && space-- > 0) {
            this.passengers.push(person);
            entered.push(person);
            continue;
          }
        }
        
        else { // Lift heading DOWN
          if (person < this.curFloor && space-- > 0) {
            this.passengers.push(person);
            entered.push(person);
            continue;
          }
        }
        
        remaining.push(person); // stays in the queue
      }
      //console.log(`Lift: Some people got on: ${entered}`);      
      //console.log(`Lift: Current passengers ${this.passengers}`);      
      //console.log(`Lift: Current queue remaming: ${remaining}`);      
      return remaining;
    }
      
    /** @return which floor to stop at next for current lift passengers? (-1 if lift is emmpty) */
    this.nextPassengerStop = function() {
      if (this.isEmpty()) return -1;
      // If we are going UP, then next floor for passenger is nearest "above" here, else nearest "below" here
      var nextStop = this.dir == Direction.UP ? Math.min(... this.passengers) : Math.max(... this.passengers);      
      //console.log(`Lift: Next stop for passengers is floor ${nextStop}`);
      return nextStop;
    }
  
    /** @return which floors did the lift stop at? */
    this.whereStopped = function() {
      return this.stoppedAt;
    }      
  }
  
  /** 
   * Does anybody on the specified floor want to go in the specified direction?
   *
   * @param floor floor whose queue we are interested in
   * @param queues all building queues
   * @param dir direction
   * @return true/false 
   */
  this.wantToGoDir = function(floor, queues, dir) {
    var queue = queues[floor];
    var dirStr = dir > 0 ? 'UP' : 'DOWN'
    for (var person of queue) {
      if (dir == Direction.UP && person > floor) {
        //console.log(`Queue: Somebody on floor ${floor} wants to go ${dirStr}`);
        return true;
      }
      if (dir == Direction.DOWN && person < floor) {
        //console.log(`Queue: Somebody on floor ${floor} wants to go ${dirStr}`);
        return true;
      }
    }
    //console.log(`Queue: Nobody on floor ${floor} wants to go ${dirStr}`);
    return false;
  }
  
  /** 
   * What is the highest floor (<= the specified one) where somebody wants to go DOWN?
   *
   * @param from look on floors <= this one
   * @param queues all building queues
   * @return highest floor (or -1 if nobody wants to go DOWN) 
   */
  this.highestGoingDownFunc = function(queues, from=queues.length-1) {
    var ret = -1;
    for (var floor = from; floor > 0; floor--) {
      if (wantToGoDir(floor, queues, Direction.DOWN)) { ret = floor; break; }
    }
    //console.log(`Queue: Highest wanting to go DOWN is on floor ${ret}`);
    return ret;
  }
  
  
  /**
   * What is the lowest floor (>= the specified one) where somebody wants to go UP?
   *
   * @param from look on floors >= this one
   * @param queues all building queues
   * @return lowest floor (or -1 if nobody wants to go UP)
   */
  this.lowestGoingUpFunc = function(queues, from=0) {
    var ret = -1;
    for (var floor = from; floor < queues.length-1; floor++) {
      if (wantToGoDir(floor, queues, Direction.UP)) { ret = floor; break; }
    }
    //console.log(`Queue: Lowest wanting to go UP is on floor ${ret}`);
    return ret;
  }
  
  /**
   * Is anbody in a queue waiting to go anywhere?!
   *
   * @param queues all building queues
   * @return true/false
   */
  this.somebodyIsWaiting = function(queues) {
    var somebodyWaiting = lowestGoingUpFunc(queues) != -1 || highestGoingDownFunc(queues) != -1;
    var somebody = somebodyWaiting ? "Somebody" : "Nobody"
    //console.log(`Queue: ${somebody} is waiting`);
    return somebodyWaiting;
  }
  
  /** 
   * The Lift goes up and down. 
   *
   * The People get on and off. 
   *
   * And I think to myself, what a wonderful world...
   */
  this.theLift = function(queues, capacity) {
    
    // Initialise
    var lift = new Lift(capacity);
    var nFloors = queues.length;  
    
    // The Lift keeps running as long as there are people waiting in queues or people in the lift
    while (somebodyIsWaiting(queues) || !lift.isEmpty()) {
     
      /* 
       * The Lift is going UP!
       */
      lift.dir = Direction.UP;
      
      // What is the next floor to stop at?
      var lowestGoingUp = lowestGoingUpFunc(queues);
      var nextPassengerStop = lift.nextPassengerStop();
      var dest = lowestGoingUp == -1 ? nextPassengerStop : nextPassengerStop == -1 ? lowestGoingUp : Math.min(lowestGoingUp, nextPassengerStop);
      
      while (dest != -1) {
      
        // 1. Lift goes the to "destination" floor
        // 2. People may get off
        // 3. People may get on (and if they do then the queue on that floor changes)
        lift.gotoFloor(dest); 
        lift.peopleGetOff(dest);
        queues[dest] = lift.peopleGetOn(queues[dest]);
        
        // What is the next floor to stop at?
        lowestGoingUp = lowestGoingUpFunc(queues, lift.currentFloor()+1);
        nextPassengerStop = lift.nextPassengerStop();
        dest = lowestGoingUp == -1 ? nextPassengerStop : nextPassengerStop == -1 ? lowestGoingUp : Math.min(lowestGoingUp, nextPassengerStop);
      }
       
      // Now change direction and do same in the opposite direction!
      
      /* 
       * Lift is going DOWN!
       */
      lift.dir = Direction.DOWN;
      
      // What is the next floor to stop at?
      var highestGoingDown = highestGoingDownFunc(queues);
      nextPassengerStop = lift.nextPassengerStop();
      dest = Math.max(highestGoingDown, nextPassengerStop);
  
      while (dest != -1) {
      
        // 1. Lift goes to the "destination" floor
        // 2. People may get off
        // 3. People may get on (and if they do then the queue on that floor changes)
        lift.gotoFloor(dest);
        lift.peopleGetOff(dest);
        queues[dest] = lift.peopleGetOn(queues[dest]);
        
        // What is the next floor to stop at?
        highestGoingDown = highestGoingDownFunc(queues, lift.currentFloor()-1);
        nextPassengerStop = lift.nextPassengerStop();
        dest = Math.max(highestGoingDown, nextPassengerStop);
      }
      
    } // repeat until everybody got where they wanted to go...
    
    // And finally, the lift returns to the ground floor.
    if (lift.currentFloor() != 0) {
      lift.gotoFloor(0);
    }
    
    return lift.whereStopped();
  }

  return this.theLift(queues, capacity);

}


// ========================================================

Test.describe("Solution Tests", function() {

  Test.describe("Basic", function() {
  
    Test.it("up", function() {
      var queues = [
        [], // G
        [], // 1
        [5,5,5], // 2
        [], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,2,5,0]);
    });
    
    Test.it("down", function() {
      var queues = [
        [], // G
        [], // 1
        [1,1], // 2
        [], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,2,1,0]);
    });  
    
    
      Test.it("up and up", function() {
      var queues = [
        [], // G
        [3], // 1
        [4], // 2
        [], // 3
        [5], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,1,2,3,4,5,0]);
    }); 
 
   Test.it("down and down", function() {
      var queues = [
        [], // G
        [0], // 1
        [], // 2
        [], // 3
        [2], // 4
        [3], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,5,4,3,2,1,0]);
    }); 

});
  
  Test.describe("Others", function() {
      
    Test.it("up and down", function() {
      var queues = [
        [3], // G
        [2], // 1
        [0], // 2
        [2], // 3
        [], // 4
        [], // 5
        [5], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,1,2,3,6,5,3,2,0]);
    });   
    
    Test.it("yo-yo", function() {
      var queues = [
        [], // G
        [], // 1
        [4,4,4,4], // 2
        [], // 3
        [2,2,2,2], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,2);
      Test.assertSimilar(result, [0,2,4,2,4,2,0]);
    });    
    
    Test.it("enter on ground floor", function() {
      var queues = [
        [1,2,3,4], // G
        [], // 1
        [], // 2
        [], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,1,2,3,4,0]);
    });   
    
    Test.it("lift full (up)", function() {
      var queues = [
        [3,3,3,3,3,3], // G
        [], // 1
        [], // 2
        [], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,3,0,3,0]);
    });     
    
    Test.it("lift full (down)", function() {
      var queues = [
        [], // G
        [], // 1
        [], // 2
        [1,1,1,1,1,1,1,1,1,1,1], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,3,1,3,1,3,1,0]);
    }); 
    
    Test.it("lift full (up and down)", function() {
      var queues = [
        [3,3,3,3,3,3], // G
        [], // 1
        [], // 2
        [], // 3
        [], // 4
        [4,4,4,4,4,4], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,3,5,4,0,3,5,4,0]);
    });   
    
    Test.it("tricky queues", function() {
      var queues = [
        [], // G
        [0,0,0,6], // 1
        [], // 2
        [], // 3
        [], // 4
        [6,6,0,0,0,6], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,1,5,6,5,1,0,1,0]);
    });     
    
    Test.it("highlander", function() {
      var queues = [
        [], // G
        [2], // 1
        [3,3,3], // 2
        [1], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,1);
      Test.assertSimilar(result, [0,1,2,3,1,2,3,2,3,0]);
    }); 
    
    Test.it("fire drill!", function() {
      var queues = [
        [], // G
        [0,0,0,0], // 1
        [0,0,0,0], // 2
        [0,0,0,0], // 3
        [0,0,0,0], // 4
        [0,0,0,0], // 5
        [0,0,0,0], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0,6,5,4,3,2,1,0,5,4,3,2,1,0,4,3,2,1,0,3,2,1,0,1,0]);
    }); 
    
    Test.it("empty", function() {
      var queues = [
        [], // G
        [], // 1
        [], // 2
        [], // 3
        [], // 4
        [], // 5
        [], // 6
      ];
      var result = theLift(queues,5);
      Test.assertSimilar(result, [0]);
    });   
    
  });
  
  Test.describe("Random Tests", function() {
    // TODO - still missing the RANDOM TESTS
    
    for (var r = 0; r < 20; r++) {
      var people = 0;
      var liftMax = 1 + Math.floor(Math.random() * 5);
      var floors = 2 + Math.floor(Math.random() * 20);      
      var queues1 = []
      var queues2 = []; // copy
      for (var floor = 0; floor < floors; floor++) {
        var qlen = Math.floor(Math.random() * 5);
        var q1 = []
        var q2 = []
        for (var i = 0; i < qlen; ) {
          var wantFloor = Math.floor(Math.random() * floors);
          if (wantFloor == floor) continue; // cant catch lift to same floor! find another floor
          q1.push(wantFloor);
          q2.push(wantFloor);
          i++;
        }
        queues1.push(q1);
        queues2.push(q2);
        people += qlen;
      }
      
      Test.it(`R#${r}: ${floors} floors, ${people} people, lift holds ${liftMax}`, function() {
        var expected = myAnswer(queues1, liftMax); 
        var userResult = theLift(queues2, liftMax);
        Test.assertSimilar(userResult, expected);
      });
      
    } // for
      
  });
    
});
