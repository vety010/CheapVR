const ws = new WebSocket("ws://192.168.0.2:4944/")
const log = console.log

function gyroOut(x,y,z) {
     const eid = "gyroOut"
     const elem = document.getElementById( eid )
     elem.innerText = `(${x}; ${y}; ${z})`
}

ws.onopen = _event => {
     log("Connected")
     
     
     const typedArray = new Uint8Array(4);
     typedArray[0] = 174;
     typedArray[1] = 121;
     typedArray[2] = 65;
     typedArray[3] = 256;

     log(typedArray)

     ws.send(typedArray)

     let gyroscope = new Gyroscope({frequency: 60});
     gyroscope.start();

     gyroscope.onreading = (e) => {
          gyroOut("hello piggies")
          //const [x, y, z] = [gyroscope.x,gyroscope.y,gyroscope.z]
          //gyroOut(x,y,z)
     }
     
     gyroscope.onerror = event => gyroOut(event.error.name, event.error.message);
}
gyroOut("waiting", "for", "connection")
