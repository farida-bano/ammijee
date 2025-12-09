# Chapter 5: Physics Simulation with Gazebo

## Learning Objectives
- [ ] Understand the role of a physics simulator in robotics.
- [ ] Learn how to set up a Gazebo simulation environment.
- [ ] Know how to spawn a robot from a URDF file into Gazebo.
- [ ] Get an overview of how to create custom worlds and environments.

## Prerequisites
- Completion of Chapter 4: Robot Description & Kinematics.
- ROS 2 Humble and Gazebo installed.

## Section 1: Why Simulate?

### Theory Explanation
Building and testing on physical robots is slow, expensive, and can be dangerous. A **physics simulator** allows us to create a virtual environment where we can test our robot's hardware and software before deploying it to the real world.

**Gazebo** is a powerful, open-source 3D robotics simulator. It accurately and efficiently simulates populations of robots in complex indoor and outdoor environments. It includes a robust physics engine, high-quality graphics, and convenient programmatic and graphical interfaces.

## Section 2: Gazebo and ROS 2

### Theory Explanation
Gazebo is tightly integrated with ROS 2. A special package, `gazebo_ros_pkgs`, provides the necessary plugins and tools to connect your ROS 2 nodes to a Gazebo simulation. This allows you to send control commands to your simulated robot and receive sensor data from it, just as you would with a real robot.

### Spawning a Robot
To get your URDF-based robot into Gazebo, you need to use a "spawn" script. This is typically done via a ROS 2 launch file. The launch file will start Gazebo, and then call the `spawn_entity.py` script to add your robot model to the simulation.

## Section 3: Creating a World

### Theory Explanation
A Gazebo "world" is a file that describes the environment for the simulation. This includes everything from the ground plane and lighting to buildings, furniture, and other objects. World files are written in the **Simulation Description Format (SDF)**.

You can create complex worlds with obstacles and different terrains to test your robot's navigation and perception algorithms in a variety of scenarios.

### Code Example: A simple world file
`my_world.world`:
```xml
<?xml version="1.0" ?>
<sdf version="1.6">
  <world name="default">
    <include>
      <uri>model://ground_plane</uri>
    </include>
    <include>
      <uri>model://sun</uri>
    </include>
    <model name="box">
      <pose>1 1 0.5 0 0 0</pose>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

## Summary
- Simulation is a critical tool in robotics for safe and efficient development.
- Gazebo is a powerful open-source simulator with tight ROS 2 integration.
- Robots are described with URDF, and worlds are described with SDF.
- You can create custom environments to test your robot in a wide range of conditions.

## Exercises
### Basic
1.  Launch an empty Gazebo world.
2.  Use the graphical interface to add a simple shape (like a sphere or a cube) to the world.

### Advanced
1.  Create a launch file that starts Gazebo and spawns your `simple_arm` robot from Chapter 4.

## Further Reading
- [ ] Gazebo Documentation
- [ ] `gazebo_ros_pkgs` Documentation
