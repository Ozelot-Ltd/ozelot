import Matter from 'matter-js';

const config = {
  gravity: { x: 0, y: 0.01, scale: 1 },
  restitution: 0.2,
  friction: 0.8,
  frictionAir: 0.2,
  density: 0.1,
  wallThickness: 10,
  mouseStiffness: 0.6,
};

let engine: Matter.Engine;
let runner: Matter.Runner;
let mouseConstraint: Matter.MouseConstraint;
let topWall = null;

const bodies: {
  body: Matter.Body;
  element: HTMLElement;
  width: number;
  height: number;
}[] = [];

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function initPhysics(container: HTMLDivElement) {
  engine = Matter.Engine.create();
  engine.gravity = config.gravity;
  engine.constraintIterations = 10;
  engine.positionIterations = 10;
  engine.velocityIterations = 50;
  engine.timing.timeScale = 1;

  const containerRect = container.getBoundingClientRect();
  const wallThickness = config.wallThickness;

  const walls = [
    Matter.Bodies.rectangle(
      containerRect.width / 2,
      containerRect.height + wallThickness / 2,
      containerRect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    ),

    Matter.Bodies.rectangle(
      -wallThickness / 10,
      containerRect.height / 2,
      wallThickness,
      containerRect.height + wallThickness * 2,
      { isStatic: true }
    ),

    Matter.Bodies.rectangle(
      containerRect.width + wallThickness,
      containerRect.height / 2,
      wallThickness,
      containerRect.height + wallThickness * 2,
      { isStatic: true }
    ),
  ];

  Matter.World.add(engine.world, walls);

  const objects = container.querySelectorAll('.object');
  objects.forEach((obj, index) => {
    const objRect = {
      width: (obj as HTMLElement).offsetWidth,
      height: (obj as HTMLElement).offsetHeight,
    };

    const startX =
      Math.random() * (containerRect.width - objRect.width) + objRect.width / 2;
    const startY = -100 - index * 200; // More spread out starting positions
    const startRotation = (Math.random() - 0.5) * 0.2; // Much less initial rotation

    const body = Matter.Bodies.rectangle(
      startX,
      startY,
      objRect.width,
      objRect.height,
      {
        restitution: config.restitution,
        friction: config.friction,
        frictionAir: config.frictionAir,
        density: config.density,
      }
    );

    Matter.Body.setAngle(body, startRotation);

    bodies.push({
      body: body,
      element: obj as HTMLElement,
      width: objRect.width,
      height: objRect.height,
    });

    Matter.World.add(engine.world, body);
  });

  setTimeout(() => {
    topWall = Matter.Bodies.rectangle(
      containerRect.width / 2,
      -wallThickness / 2,
      containerRect.width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    );
    Matter.World.add(engine.world, topWall);
  }, 3000);

  const mouse = Matter.Mouse.create(container);
  mouse.element.removeEventListener(
    'mousewheel',
    (mouse as Matter.Mouse & { mousewheel: EventListener }).mousewheel
  );
  mouse.element.removeEventListener(
    'DOMMouseScroll',
    (mouse as Matter.Mouse & { mousewheel: EventListener }).mousewheel
  );

  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: config.mouseStiffness,
      render: { visible: false },
    },
  });

  mouseConstraint.mouse.element.oncontextmenu = () => false;

  let dragging: Matter.Body | null = null;
  let originalInertia: number | null = null;

  Matter.Events.on(mouseConstraint, 'startdrag', function (event) {
    dragging = (event.source as Matter.MouseConstraint).body;
    if (dragging) {
      originalInertia = dragging.inertia;
      Matter.Body.setInertia(dragging, Infinity);
      Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(dragging, 0);
    }
  });

  Matter.Events.on(mouseConstraint, 'enddrag', function () {
    if (dragging) {
      Matter.Body.setInertia(dragging, originalInertia || 1);
      dragging = null;
      originalInertia = null;
    }
  });

  Matter.Events.on(engine, 'beforeUpdate', function () {
    if (dragging) {
      const found = bodies.find((b) => b.body === dragging);
      if (found) {
        const minX = found.width / 2;
        const maxX = containerRect.width - found.width / 2;
        const minY = found.height / 2;
        const maxY = containerRect.height - found.height / 2;

        Matter.Body.setPosition(dragging, {
          x: clamp(dragging.position.x, minX, maxX),
          y: clamp(dragging.position.y, minY, maxY),
        });

        Matter.Body.setVelocity(dragging, {
          x: clamp(dragging.velocity.x, -20, 20),
          y: clamp(dragging.velocity.y, -20, 20),
        });
      }
    }
  });

  container.addEventListener('mouseleave', () => {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null as unknown as Matter.Vector;
  });

  container.addEventListener('mouseup', () => {
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.constraint.pointB = null as unknown as Matter.Vector;
  });

  Matter.World.add(engine.world, mouseConstraint);

  runner = Matter.Runner.create();

  Matter.Runner.run(runner, engine);

  function updatePositions() {
    bodies.forEach(({ body, element, height, width }) => {
      const x = clamp(
        body.position.x - width / 2,
        0,
        containerRect.width - width
      );

      const y = clamp(
        body.position.y - height / 2,
        -height * 3,
        containerRect.height - height
      );

      element.style.left = Math.round(x) + 'px';
      element.style.top = Math.round(y) + 'px';
      element.style.transform = `rotate(${body.angle}rad)`;
    });
    requestAnimationFrame(updatePositions);
  }

  updatePositions();
}

export { clamp, initPhysics };
