// set up a renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x333333, 1)

// choose the HTML element to add the renderer to
const section = document.querySelector("section")
section.appendChild(renderer.domElement)

// create a SCENE
const scene = new THREE.Scene()

// create a CAMERA
const camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 0.1, 5000) // fov, aspect ratio, near clipping, far clipping
camera.position.z = -50
camera.lookAt(scene.position)


// you need to add LIGHTS to the scene
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0,0,-1)
scene.add(light) 

const shapes = []

// add an ANIMATION loop
const animate = function() {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)

    shapes.forEach(shape => {
        shape.rotateX(0.01)
        shape.rotateY(0.01)
        shape.rotateZ(0.01)
    })
}
// and kick off the animation
animate()

// ok, now you can create SHAPES/GEOMETRIES and their MATERIALS
const createShape = function(x, y) {

    const geometry = new THREE.TorusGeometry(5, 3, 16, 100)
    const material = new THREE.MeshLambertMaterial({
        color:0xffffff,
        emissive: 0xff000
    })

    const shape = new THREE.Mesh(geometry, material)

    shape.position.set(
        (window.innerWidth / 2) - x, 
        (window.innerHeight / 2) - y, 
        camera.position.z + 500 // this makes sure you're placing objects in front of camera
        )

    shapes.push(shape)
    scene.add(shape)
}

// do things on click and drag

let isMouseDown = false

document.addEventListener("mousemove", function(event) {
    if (isMouseDown) {
        createShape(event.pageX, event.pageY)
    }
})

document.addEventListener("mousedown", function() {
    isMouseDown = true
    createShape(event.pageX, event.pageY)
})

document.addEventListener("mouseup", function() {
    isMouseDown = false
})

// and on mobile 

document.addEventListener("touchmove", function(event) {
    if (isMouseDown) {
        createShape(event.pageX, event.pageY)
    }
})

document.addEventListener("touchstart", function() {
    isMouseDown = true
    createShape(event.pageX, event.pageY)
})

document.addEventListener("touchend", function() {
    isMouseDown = false
})

window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})