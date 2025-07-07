# SmartInventory

## Introduction

SmartInventory is a full-featured inventory management system designed to help businesses track, manage, and optimize their stock with ease. It enables users to add and update items, set low-stock and expiry alerts, and generate analytics-based reports. The app also includes role-based access control and QR code integration for efficient tracking. This solution aims to minimize inventory wastage and maximize operational efficiency for both small and medium-scale businesses.

## Project Type

Frontend

## Deployed App

Frontend: https://smart-inventory-2025.netlify.app/

## Directory Structure

```
smartinventory-app/
├─ backend/             # Firebase Firestore + Auth config
├─ frontend/            # React + Vite + Chakra UI + Redux Toolkit
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  ├─ routes/
│  │  └─ theme/
```

## Video Walkthrough of the project

[click here](https://youtu.be/K-d7B_PtLoQ)



## Features

* Inventory CRUD: Add, edit, delete, and search items with categories, expiry, and quantity.
* Role-Based Access: Assign Admin, Manager, Viewer roles with permission control.
* QR Code Generation: Generate and download QR codes for each item.
* Stock & Expiry Alerts: Automatic alerts for low-stock and near-expiry items.
* Responsive UI: Works seamlessly on desktop, tablet, and mobile.
* Dark Mode: Toggle between light and dark themes.
* Dashboard Reports: Visual insights with charts.

## Design Decisions & Assumptions

* Used Firebase for easy real-time sync and secure role-based access.
* Used Chakra UI for faster development and accessibility.
* Redux Toolkit simplifies state management across components.
* Decided to implement QR code generation (not scanning) due to time constraints.

## Installation & Getting Started

```bash
# Clone the project
git clone https://github.com/yourusername/smartinventory-app.git
cd smartinventory

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev
```

## Usage

```bash
# Start dev server
npm run dev

# Add a new item from dashboard
# Set quantity and expiry date to test alert features
# Navigate to different roles to test permissions
```

![Screenshot 2025-07-07 213232](https://github.com/user-attachments/assets/4e569537-237d-46c5-ab29-0562a032a530)
![Screenshot 2025-07-07 212510](https://github.com/user-attachments/assets/485e580a-80c2-43d7-8ba6-044385b47999)
![Screenshot 2025-07-07 213213](https://github.com/user-attachments/assets/3fe762d7-2b54-48fb-a260-2138ee2bce0f)
![Screenshot 2025-07-07 212803](https://github.com/user-attachments/assets/9dfe12bc-47a1-4f98-a557-36692e24cb6b)
![Screenshot 2025-07-07 213133](https://github.com/user-attachments/assets/654be8cd-789d-4a52-afca-91ecf70d94ed)


## APIs Used

* Firebase Authentication
* Firebase Firestore (Realtime Database)
* QR Code Library: `react-qr-code`


## Technology Stack

* **Frontend**: React, Vite, Chakra UI, Redux Toolkit
* **Backend**: Firebase Authentication, Firestore Database
* **Other Libraries**: react-icons, react-qr-code, recharts
