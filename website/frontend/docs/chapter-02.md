# Chapter 2: The Hardware Stack

## Learning Objectives
- [ ] Identify the key hardware components needed for Physical AI development.
- [ ] Understand the specifications for a suitable development workstation.
- [ ] Learn about edge computing platforms like the NVIDIA Jetson series.
- [ ] Get an overview of common sensor systems used in robotics.
- [ ] Compare different commercially available humanoid robot platforms.

## Prerequisites
- Basic familiarity with computer components (CPU, GPU, RAM).

## Section 1: The Development Workstation

### Theory Explanation
Your development workstation is the command center for robotics development. It's where you'll write code, run intensive simulations, and visualize data. The most critical component for modern robotics, especially when dealing with AI and simulation, is the **Graphics Processing Unit (GPU)**.

### Recommended Specifications
- **GPU**: NVIDIA RTX 4070 Ti or higher. The CUDA cores in NVIDIA GPUs are essential for parallel processing in AI model training and physics simulation.
- **CPU**: Intel Core i9 or AMD Ryzen 9 (12+ cores). A powerful CPU is crucial for compiling code, running the OS, and handling non-GPU intensive tasks.
- **RAM**: 64GB DDR5. Large and fast RAM is needed to load complex simulation environments and large datasets.
- **Storage**: 1TB NVMe SSD. A fast SSD reduces load times for software, simulations, and datasets.

## Section 2: Edge Computing for Robots

### Theory Explanation
While a powerful workstation is great for development, a robot needs its own onboard computer to operate autonomously. This is where **edge computing** comes in. These are small, power-efficient computers that can run AI models and control logic directly on the robot.

### Key Platforms
- **NVIDIA Jetson Series (Orin, AGX, etc.)**: The Jetson platform is an industry standard for edge AI. It packs a powerful NVIDIA GPU into a small form factor, making it perfect for running perception and navigation algorithms on a robot.

## Section 3: Sensors - The Robot's Senses

### Theory Explanation
A robot is only as good as its ability to perceive the world. A rich sensor suite is essential for a robot to navigate, interact with objects, and understand its environment.

### Common Sensor Systems
- **LiDAR (Light Detection and Ranging)**: Provides 3D point cloud data of the environment, excellent for mapping and obstacle avoidance.
- **Cameras (RGB, Depth)**: Provide rich visual information. Depth cameras add a 3D understanding of the scene.
- **IMU (Inertial Measurement Unit)**: Measures orientation and angular velocity, crucial for balance and stabilization.
- **Force/Torque Sensors**: Placed in joints and end-effectors, these sensors allow the robot to feel its interactions with the world.

## Section 4: Platform Comparison

| Platform | Key Features | Use Case |
|---|---|---|
| Boston Dynamics Atlas | Highly dynamic, acrobatic | Research, Advanced Mobility |
| Unitree H1 | High-performance, relatively affordable | Research, General Purpose |
| Agility Robotics Digit | Designed for logistics, has arms | Warehouse automation |
| Tesla Optimus | Focus on AI and real-world tasks | General purpose, manufacturing |

## Summary
- A powerful, NVIDIA-equipped workstation is the cornerstone of modern robotics development.
- Edge computers like the NVIDIA Jetson series are required for onboard processing.
- A combination of LiDAR, cameras, and IMUs form the primary sensory system for a humanoid robot.

## Exercises
### Basic
1.  Go to a computer hardware website and configure a PC that meets the recommended specifications. What is the total cost?
2.  Research the NVIDIA Jetson Orin Nano and the AGX Orin. What are the key differences in their specifications?

### Advanced
1.  Compare the pros and cons of using a 3D LiDAR versus a stereo depth camera for obstacle avoidance. When would you choose one over the other?

## Further Reading
- [ ] NVIDIA Jetson Documentation
- [ ] Velodyne LiDAR Product Guides
