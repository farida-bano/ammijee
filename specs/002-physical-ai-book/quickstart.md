# Quickstart Guide: Physical AI & Humanoid Robotics Book Environment Setup

This guide provides the steps to set up the recommended development environment for this book.

## 1. Hardware Requirements

For the best experience, especially with NVIDIA Isaac Sim, the following hardware is recommended:

- **GPU**: NVIDIA RTX 4070 Ti or higher
- **CPU**: Intel Core i9 or AMD Ryzen 9, 12+ cores
- **RAM**: 64GB DDR5
- **Storage**: 1TB NVMe SSD

**Minimum Viable Hardware (for Gazebo and core ROS 2 sections):**
- **GPU**: NVIDIA RTX 3060
- **RAM**: 32GB DDR4

## 2. Software Requirements

- **Operating System**: Ubuntu 22.04 LTS (Jammy Jellyfish)
- **NVIDIA Driver**: Version 525.60.11 or later
- **Docker**: Latest version

## 3. Environment Setup

### Step 1: Install NVIDIA Drivers

Ensure you have the correct NVIDIA drivers installed.
```bash
# Check your current driver version
nvidia-smi
```
If you need to install or update, follow the official NVIDIA guide for Ubuntu.

### Step 2: Install Docker

Follow the official Docker installation guide for Ubuntu. After installation, add your user to the `docker` group to run commands without `sudo`.
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Step 3: Install ROS 2 Humble

Follow the official ROS 2 Humble installation instructions.
```bash
# Example commands (refer to official docs for full steps)
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install ros-humble-desktop
```

### Step 4: Set up the Project Repository

Clone the book's GitHub repository.
```bash
git clone <repository-url>
cd <repository-name>
```

### Step 5: (Optional) Set up NVIDIA Isaac Sim

For the advanced simulation chapters, you will need to install NVIDIA Isaac Sim.

1.  Download and install **NVIDIA Omniverse Launcher**.
2.  From the launcher, install **Isaac Sim 2023.1+**.
3.  Follow the Isaac Sim documentation for initial setup and tutorials.

### Step 6: (Optional) Set up Cloud Environment

If you do not have the recommended local hardware, an appendix in the book will provide detailed instructions for setting up an AWS or GCP instance with the required GPU and software.

## 4. Verify Your Installation

To ensure your environment is set up correctly, run the verification script provided in the repository.
```bash
cd book/code-examples/chapter-01
./verify_setup.sh
```
This script will check for key dependencies like ROS 2, Docker, and Python packages, ensuring you are ready to start the exercises.
