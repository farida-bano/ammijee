# Chapter 3: ROS 2 Fundamentals

## Learning Objectives
- [ ] Understand the core architecture of ROS 2: Nodes, Topics, Services, and Actions.
- [ ] Set up a ROS 2 Humble development environment on Ubuntu 22.04.
- [ ] Learn to build custom ROS 2 packages using Python (`rclpy`).
- [ ] Understand how to use launch files to start complex systems.
- [ ] Get familiar with debugging and visualization tools like RVIZ2.

## Prerequisites
- Completion of Chapter 2: The Hardware Stack.
- A workstation with Ubuntu 22.04 installed.

## Section 1: The ROS 2 Architecture

### Theory Explanation
ROS 2 is not an operating system in the traditional sense. It is a middleware—a set of software libraries and tools that help you build robot applications. It provides services like hardware abstraction, low-level device control, implementation of commonly-used functionality, message-passing between processes, and package management.

The core of ROS 2 is a graph of nodes that communicate with each other.

### Key Terminology
- **Nodes:** A process that performs computation. A robot control system is comprised of many nodes. For example, a node for controlling the wheels, a node for reading sensor data, a node for path planning, etc.
- **Topics:** Nodes communicate with each other by publishing messages to topics. Other nodes can subscribe to these topics to receive the messages. This is a one-to-many communication model.
- **Services:** A request/reply communication model. A node can offer a service, and another node can send a request and wait for a response.
- **Actions:** A longer-running, feedback-enabled version of services. Useful for tasks like "navigate to a location", where you want to get progress updates and be able to cancel the goal.

## Section 2: Setting up Your Environment

### Step-by-Step Guide
1.  **Install ROS 2 Humble:** Follow the official ROS 2 Humble installation guide for Ubuntu 22.04. This is the most critical step.
    ```bash
    # (Refer to official docs for full, up-to-date commands)
    sudo apt update && sudo apt install ros-humble-desktop
    ```
2.  **Source the setup file:** To use ROS 2, you need to source the setup file in your shell.
    ```bash
    source /opt/ros/humble/setup.bash
    ```
    It's a good practice to add this command to your `~/.bashrc` file.
3.  **Create a workspace:** A ROS 2 workspace is a directory where you will create your custom packages.
    ```bash
    mkdir -p ~/ros2_ws/src
    cd ~/ros2_ws
    ```

## Section 3: Creating a Python Package

### Code Example
Let's create a simple "hello world" publisher node in Python.

1.  **Create the package:**
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_python my_first_package
    ```
2.  **Create the node file:** `~/ros2_ws/src/my_first_package/my_first_package/my_node.py`
    ```python
    import rclpy
    from rclpy.node import Node
    from std_msgs.msg import String

    class MyPublisher(Node):
        def __init__(self):
            super().__init__('my_publisher')
            self.publisher_ = self.create_publisher(String, 'chatter', 10)
            self.timer = self.create_timer(0.5, self.timer_callback)

        def timer_callback(self):
            msg = String()
            msg.data = 'Hello World: %d' % self.get_clock().now().to_msg().sec
            self.publisher_.publish(msg)
            self.get_logger().info('Publishing: "%s"' % msg.data)

    def main(args=None):
        rclpy.init(args=args)
        my_publisher = MyPublisher()
        rclpy.spin(my_publisher)
        my_publisher.destroy_node()
        rclpy.shutdown()

    if __name__ == '__main__':
        main()
    ```
3.  **Update `setup.py`:** Add the entry point for your node in `~/ros2_ws/src/my_first_package/setup.py`.
    ```python
    # ... inside the setup() function
    entry_points={
        'console_scripts': [
            'my_node = my_first_package.my_node:main',
        ],
    },
    ```
4.  **Build and run:**
    ```bash
    cd ~/ros2_ws
    colcon build
    source install/setup.bash
    ros2 run my_first_package my_node
    ```

## Summary
- ROS 2 provides a structured way to build complex robot software.
- The core concepts are nodes, topics, services, and actions.
- `colcon` is the build tool for ROS 2.
- `rclpy` is the Python client library for ROS 2.

## Exercises
### Basic
1.  Create a subscriber node that listens to the `chatter` topic and prints the messages it receives.
2.  Modify the publisher to send your name instead of "Hello World".

### Advanced
1.  Create a service that takes a name as a request and returns a greeting.

## Further Reading
- [ ] ROS 2 Humble Documentation
- [ ] `rclpy` API Documentation
