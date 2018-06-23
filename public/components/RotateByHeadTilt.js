

AFRAME.registerComponent('rotate-by-head-tilt', {

  dependencies: ['position', 'rotation'],

  schema: {
    inverseRotation: {default: true, type: 'boolean'},
    minHeadAngle: {default: 4, type: 'float'},
    maxHeadAngle: {default: 8, type: 'float'},
    dampeningFactor: {default: 8, type: 'int'}
  },

  init: function () {

    this.initialForward = new THREE.Vector3(0,0,-1);
    
    this.cameraForward = new THREE.Vector3();
    this.cameraRotation = new THREE.Quaternion();

    this.tiltAxis = new THREE.Vector3();
    this.tiltRotation = new THREE.Quaternion();
  },

  update: function () {
  },

  tick: function (time, timeDelta) {
    
    this.calculateCameraForward();

    this.cameraRotation.setFromUnitVectors( this.initialForward, this.cameraForward );
   
    var cameraAxisAngleRotation = this.toAxisAngle(this.cameraRotation);
    
    var headRotationAxis = cameraAxisAngleRotation.axis;
    var headRotationAngle = cameraAxisAngleRotation.angle;

    // Bound angle to upper limit.
    if (headRotationAngle > this.data.maxHeadAngle)
    {
      headRotationAngle = this.data.maxHeadAngle;
    }

    // Check if angle exceeds lower limit.
    if (headRotationAngle > this.data.minHeadAngle)
    { 
      this.tiltAxis = headRotationAxis;
      var tiltAngle = (headRotationAngle / this.data.dampeningFactor) * (timeDelta / 1000);    // Devide final rotation angle by dampening factor. Proportional to delta time.

      // Calculate new rotation using smaller angle.
      this.tiltRotation.setFromAxisAngle(this.tiltAxis, tiltAngle);

      //To invert rotation
      if (this.data.inverseRotation)
      {
          this.tiltRotation.inverse();
      }
      
      this.el.object3D.applyQuaternion(this.tiltRotation);

    }
  }, 

  calculateCameraForward: function() {

    var cameraObj = document.querySelector("[camera]").object3D;
  
    this.cameraForward.copy(this.initialForward);
    
    this.cameraForward.applyQuaternion( cameraObj.quaternion );

  },

  toAxisAngle: function(q){
  
    var angle;
    var axis = new THREE.Vector3();

    if (q.w > 1) {
      q.normalise(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
    }
  
    angle =  THREE.Math.radToDeg(2 * Math.acos(q.w));
    var s = Math.sqrt(1-q.w*q.w); // assuming quaternion normalised then w is less than 1, so term always positive.
  
    if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
      // if s close to zero then direction of axis not important
      axis.x = q.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
      axis.y = q.y;
      axis.z = q.z;
    } else {
      axis.x = q.x / s; // normalise axis
      axis.y = q.y / s;
      axis.z = q.z / s;
    }

    return { axis: axis, angle: angle };

  }

});

