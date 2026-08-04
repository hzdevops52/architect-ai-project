# 🚀 Architect AI - End-to-End DevOps Deployment on Kubernetes

> A production-inspired DevOps project demonstrating containerization, Kubernetes orchestration, GitOps, monitoring, and observability using modern DevOps tools.

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.34-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Helm](https://img.shields.io/badge/Helm-Package_Manager-0F1689)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-orange)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C)
![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800)

---

# 📖 Project Overview

Architect AI is a modern frontend application deployed using a complete DevOps workflow on Kubernetes.

The primary goal of this project was **not application development**, but implementing an end-to-end DevOps pipeline covering application deployment, GitOps, monitoring, alerting, and Kubernetes best practices.

This project demonstrates how a real-world application can be deployed and monitored using industry-standard DevOps tools.

---

# 🏗 Architecture

```
                   GitHub Repository
                           │
                           ▼
                      ArgoCD (GitOps)
                           │
                           ▼
                   Kubernetes Cluster
                   (Minikube Local)
                           │
        ┌──────────────────┴─────────────────┐
        │                                    │
        ▼                                    ▼
 Frontend Deployment                Backend Services
        │                                    │
        └──────────────┬─────────────────────┘
                       ▼
                    MongoDB
                       │
                       ▼
               Application Running
                       │
      ┌────────────────┴─────────────────┐
      ▼                                  ▼
 Prometheus                      Grafana Dashboard
      │                                  │
      └──────────────┬───────────────────┘
                     ▼
             Custom Alert Rules
```

---

# 🛠 Tech Stack

## Containerization

- Docker
- Docker Compose

## Orchestration

- Kubernetes
- Minikube

## GitOps

- ArgoCD

## Package Management

- Helm

## Monitoring

- Prometheus
- Node Exporter
- kube-state-metrics
- Grafana

## Database

- MongoDB

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
architect-ai/
│
├── frontend/
├── backend/
├── docker/
├── docker-compose.yml
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── namespace.yaml
│
├── monitoring/
│   ├── prometheus/
│   ├── grafana/
│   └── alerts/
│
├── helm/
│
└── README.md
```

---

# ⚙ DevOps Workflow

## Phase 1

Application Setup

- Clone Repository
- Install Dependencies
- Run Application Locally

---

## Phase 2

Docker

- Multi-stage Docker Build
- Lightweight Production Image
- Nginx Runtime

---

## Phase 3

Docker Compose

- Multi-container Deployment
- Backend
- Frontend
- MongoDB

---

## Phase 4

GitHub

- Source Code Management
- Version Control
- Branch Management

---

## Phase 5

Kubernetes

Deployment includes:

- Deployments
- Services
- ReplicaSets
- Scaling
- Rolling Updates
- Self Healing

---

## Phase 6

Helm

Helm was used to install:

- Prometheus
- Grafana
- ArgoCD

---

## Phase 7

GitOps

Application deployment automated using:

- ArgoCD
- Git Repository Synchronization
- Continuous Deployment

---

## Phase 8

Monitoring

Implemented using Prometheus.

Metrics collected from:

- Kubernetes Cluster
- Pods
- Nodes
- Containers

---

## Phase 9

Visualization

Built custom Grafana dashboards including:

- Running Pods
- CPU Usage
- Memory Usage
- Pod Restarts
- Replica Count
- Namespace Metrics
- Node Metrics
- Cluster Health
- Container Metrics
- Kubernetes Resource Statistics

---

## Phase 10

Alerting

Implemented custom Grafana Alerts.

Example alerts:

- Pod Restart Alert
- Threshold-based Monitoring
- Alert Evaluation Rules
- Alert States
    - Normal
    - Pending
    - Firing

---

# 📊 Features

✅ Dockerized Application

✅ Multi-stage Docker Build

✅ Kubernetes Deployment

✅ Horizontal Scaling

✅ Helm Package Management

✅ GitOps using ArgoCD

✅ Prometheus Monitoring

✅ Grafana Custom Dashboards

✅ Grafana Alert Rules

✅ Kubernetes Metrics Collection

---

# 📈 Monitoring Stack

```
Application

      │

      ▼

Node Exporter
kube-state-metrics

      │

      ▼

Prometheus

      │

      ▼

Grafana

      │

      ▼

Custom Dashboards
&
Alert Rules
```

---

# 🚨 Sample Alert

**Architect AI - Pod Restart Alert**

Condition:

```
Restart Count > 0
```

Evaluation Interval:

```
1 Minute
```

Alert States:

- Normal
- Pending
- Firing

---

# 🚀 Deployment Steps

## Clone Repository

```bash
git clone <repository-url>
```

---

## Build Docker Images

```bash
docker build -t architect-ai .
```

---

## Start Kubernetes

```bash
minikube start
```

---

## Deploy Application

```bash
kubectl apply -f k8s/
```

---

## Install Monitoring Stack

```bash
helm install prometheus prometheus-community/prometheus

helm install grafana grafana/grafana
```

---

## Install ArgoCD

```bash
helm install argocd argo/argo-cd
```

---

# 📷 Screenshots

Add screenshots for:

- Architecture Diagram
- Kubernetes Pods
- ArgoCD Dashboard
- Grafana Dashboard
- Prometheus Metrics
- Grafana Alerts
- Kubernetes Resources

---

# 📚 Learning Outcomes

During this project I learned:

- Docker Image Optimization
- Multi-stage Docker Builds
- Kubernetes Architecture
- ReplicaSets
- Deployments
- Services
- Helm Charts
- GitOps Concepts
- ArgoCD Synchronization
- Kubernetes Monitoring
- Prometheus Query Language (PromQL)
- Grafana Dashboard Design
- Grafana Alerting
- Kubernetes Troubleshooting
- Production-inspired DevOps Workflow

---

# 🔮 Future Improvements

- AWS Deployment
- CI/CD Pipeline
- Loki Log Aggregation
- Promtail
- Ingress Controller
- HTTPS
- Terraform Infrastructure
- High Availability Kubernetes Cluster

---

# 👨‍💻 Author

**Hassan Zubair**

DevOps Engineer

GitHub:
https://github.com/hzdevops52

LinkedIn:
(Add your LinkedIn Profile)

---

# ⭐ If you found this project useful, don't forget to star the repository.
