Design Document: Comparative Analysis of Monolithic and Microservices Architectures
1. Title and Overview
Title: Performance Optimization and Comparative Analysis: Monolithic vs. Microservices Architectures
Overview:
This project extends the work in "From Monolithic Systems to Microservices: A Comparative Study of Performance" by implementing both architectures with a focus on improved performance measurement granularity.
We aim to isolate the resource consumption patterns and response efficiency of both architectures under a simulated user load. Using a targeted approach, we test each architecture’s scalability, throughput, and resource utilization in a controlled environment. The goal is to not only validate prior findings but also pinpoint which specific architectural features enhance performance in real-world scenarios.
2. Project Goals and Problem Definition
Goal: This project builds an end-to-end performance comparison of monolithic and microservices architectures, focusing on identifying the performance variances in CPU usage, memory consumption, network I/O, and response latency.
Why This Project?:
The previous paper highlighted performance differences without delving into the functional impact of individual services within a microservices setup. Our project remedies this by:
Testing an architecture where services such as user authentication, content management, and database operations run independently in microservices.
Applying detailed, service-specific load testing to each architecture, providing insights into which service architectures benefit most from a microservices approach.
Proposing an optimized, performance-centric architecture recommendation based on empirical findings from isolated service metrics.
3. Architectural Design
3.1 Monolithic Architecture
Structure:

A single-instance deployment is implemented where application components (User Management, Content Delivery, Database Access) operate as part of one tightly integrated package. This entire application is hosted on a virtual machine (VM) to ensure environmental consistency and ease of resource tracking.
Deployment Specifications:

A KVM instance runs the Node.js application, with direct connections to the database (MySQL). This VM is configured with a fixed allocation of memory and CPU to simulate a production environment and maintain predictable resource usage.
Data flow and processing logic are contained within the VM’s memory allocation, simulating typical monolithic performance constraints under varying loads.
Improvement Over Baseline:

By using controlled VM allocation, we can record precise changes in CPU, memory, and disk usage under stress tests, highlighting monolithic limits in resource scalability without external influences.
Diagram:

+------------------------+
|       Monolithic VM    |
| +--------------------+ |
| | App Logic (Node.js)| |
| +--------------------+ |
| +--------------------+ |
| | Database (MySQL)   | |
| +--------------------+ |
+------------------------+
3.2 Microservices Architecture
Structure:
The application is split into modular services (User, Thread, and Post) deployed in Docker containers. Each service independently manages its database interactions, scaling as demand dictates.
Each service is contained within a Docker environment, managed by Docker Compose. This setup allows detailed per-service metrics tracking, making it possible to observe specific resource spikes tied to individual functions.
Deployment Specifications:
Each Docker container is allocated a separate network and CPU quota, ensuring isolated load distribution. This setup allows testing of inter-service communication efficiency under real-world scenarios, especially around data-intensive operations.
Improvement Over Baseline:
This project isolates service-specific workloads, enabling precise tracking of resource consumption per service. Unlike previous studies that observed aggregate results, we analyze each microservice independently, identifying bottlenecks within specific services and pinpointing resource distribution needs.
Diagram:
+-------------------------------------+
| Docker Containers                   |
| +--------+ +--------+ +--------+    |
| | User   | | Thread | | Post   |    |
| | Service| | Service| | Service|    |
| +--------+ +--------+ +--------+    |
| +--------------------------+        |
| | Database (MySQL/MongoDB) |        |
| +--------------------------+        |
+-------------------------------------+
4. Workflow Execution
Step-by-Step Execution Plan:
Monolithic Deployment:

Deploy the entire application package within a KVM instance, starting with database setup, followed by web server configuration and application deployment. Verify functional connectivity to simulate production.
Initial Testing: Run preliminary load tests to ensure baseline functionality before implementing full stress testing. Verify connectivity between Node.js and MySQL.
Microservices Deployment:

Set up Docker Compose with configurations for each independent service, specifying network, memory, and CPU constraints for each container.
Isolation Verification: Test individual service calls to verify proper container isolation and inter-service communication through API endpoints.
Load Testing Setup:

Design stress-testing scenarios in Apache JMeter, targeting both the monolithic VM and individual microservices, ensuring standardized test parameters.
Metrics Collection: For each architecture, collect metrics from JMeter on response time, throughput, CPU usage, memory usage, and network I/O, with data segmented by service in the microservices deployment.
Performance Data Analysis:

Use statistical analysis to compare the response efficiency and resource utilization of each architecture under identical load conditions.
Service-Specific Metrics: Apply regression analysis to understand how each microservice's workload affects overall system performance, focusing on CPU/memory peaks and network latencies.
Result Synthesis:

Based on collected data, formulate conclusions about the specific circumstances under which each architecture excels. Highlight which services benefit most from microservices, supporting recommendations for optimal architecture use cases.
5. Tools and Testing Metrics
Tools:

Apache JMeter: Manages load testing, simulating user actions across both architectures with comparable request rates and patterns.
Docker/Docker Compose: Containerizes each service within the microservices architecture, ensuring modular testing and inter-service communication monitoring.
KVM: Hosts the monolithic application, isolating it in a controlled VM for resource monitoring without external dependencies.
Performance Metrics:

CPU Usage: Record CPU consumption during load testing to compare load distribution across both architectures.
Memory Usage: Track memory allocation and usage per service in the microservices environment.
Network Latency and Throughput: Measure network data for communication overhead in microservices and latency within the monolithic setup.
Response Times: Monitor response efficiency for each service endpoint, comparing monolithic aggregate response with distributed microservices response.
6. Expected Outcomes and Improvements
Predicted Outcomes:

The monolithic architecture is expected to perform well in controlled environments with moderate loads. However, under high load, we predict bottlenecks due to resource sharing across all functions.
The microservices architecture is expected to distribute load more effectively, especially in high-throughput scenarios. By isolating services, we anticipate reduced response times for certain services, such as user authentication, which can operate independently of content services.
Expected Recommendations:

Monolithic Architecture:
Recommended for applications where simplicity is prioritized and the expected load is low to moderate. This setup minimizes deployment complexity and provides efficient processing within single-instance limits.
Microservices Architecture:
Suitable for applications requiring high scalability, modularity, and independent service handling. Recommended for systems expected to encounter high traffic or for applications where different services benefit from being scaled independently.
Potential trade-offs include increased resource requirements and management complexity, but these are offset by the ability to maintain performance under high loads and modularize service upgrades.
Application to Real-World Scenarios:

By conducting a detailed, service-specific performance analysis, this project aims to provide more than just general guidance on architectural selection. Instead, it will offer targeted recommendations based on empirical data, supporting architecture choices for projects with distinct operational demands and scalability requirements.
10. Design Document Summary
This document provides a focused framework for implementing and evaluating monolithic and microservices architectures. Through carefully controlled testing and detailed data analysis, this project will validate the performance trade-offs and benefits of each architecture, ultimately guiding developers in making data-backed decisions about architecture choice based on specific project needs.