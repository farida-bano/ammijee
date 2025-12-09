# Chapter 4: Robot Description & Kinematics

## Learning Objectives
- [ ] Understand the purpose and structure of the Unified Robot Description Format (URDF).
- [ ] Learn how to create a URDF file for a simple robot.
- [ ] Grasp the concepts of forward and inverse kinematics.
- [ ] Get an overview of the Kinematics and Dynamics Library (KDL).

## Prerequisites
- Completion of Chapter 3: ROS 2 Fundamentals.
- Basic understanding of XML.

## Section 1: Describing a Robot with URDF

### Theory Explanation
To work with a robot in ROS 2, we first need to describe it. The **Unified Robot Description Format (URDF)** is an XML file format used in ROS to describe all elements of a robot. This includes:
- **Links:** The rigid parts of the robot (e.g., the arm, the leg, the torso).
- **Joints:** The connections between links, which define how the links can move relative to each other (e.g., revolute, prismatic, fixed).
- **Visuals:** The 3D models used to visualize the robot's links.
- **Collisions:** The simplified shapes used by the physics engine to calculate collisions.

By creating a URDF file, we provide ROS 2 with a complete model of our robot, which can then be used for simulation, visualization, and control.

### Code Example: A Simple Two-Link Arm
Here is an example of a URDF for a simple arm with two links and two revolute joints.

`simple_arm.urdf`:
```xml
<?xml version="1.0"?>
<robot name="simple_arm">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.1" radius="0.1"/>
      </geometry>
    </visual>
  </link>

  <link name="link_1">
    <visual>
      <geometry>
        <box size="0.5 0.1 0.1"/>
      </geometry>
    </visual>
  </link>

  <joint name="joint_1" type="revolute">
    <parent link="base_link"/>
    <child link="link_1"/>
    <origin xyz="0 0 0.05"/>
    <axis xyz="0 0 1"/>
    <limit lower="-3.14" upper="3.14" effort="10" velocity="1"/>
  </joint>

  <link name="link_2">
    <visual>
      <geometry>
        <box size="0.5 0.1 0.1"/>
      </geometry>
    </visual>
  </link>

  <joint name="joint_2" type="revolute">
    <parent link="link_1"/>
    <child link="link_2"/>
    <origin xyz="0.5 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-3.14" upper="3.14" effort="10" velocity="1"/>
  </joint>
</robot>
```

## Section 2: Kinematics - The Geometry of Motion

### Theory Explanation
**Kinematics** is the study of motion without considering the forces that cause it. In robotics, we are interested in two types of kinematics:

- **Forward Kinematics (FK):** Given the angles of all the robot's joints, where is the end-effector (e.g., the hand)? This is a straightforward calculation.
- **Inverse Kinematics (IK):** Given a desired position and orientation for the end-effector, what are the angles that the joints need to be at to achieve that pose? This is a much more complex problem and often has multiple or no solutions.

ROS 2 has built-in tools for handling kinematics, often using libraries like the **Kinematics and Dynamics Library (KDL)**.

## Summary
- URDF is the standard format for describing a robot's structure in ROS 2.
- Kinematics is the geometry of motion, with Forward Kinematics (joint angles to end-effector pose) and Inverse Kinematics (end-effector pose to joint angles) being the key problems.
- ROS 2 provides tools and libraries like KDL to solve kinematics problems.

## Exercises
### Basic
1.  Create a URDF file for a simple mobile robot with a base and two wheels.
2.  Use the `check_urdf` command to verify your URDF file.

### Advanced
1.  Research the difference between a URDF and a SDF (Simulation Description Format). What are the advantages of each?

## Further Reading
- [ ] URDF Documentation
- [ ] KDL Documentation
