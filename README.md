<h1 align="center"></h1>

<div align="center">

# Logtrack

![Logtrack Logo](logo.png)

[![CI](https://github.com/kdiehl/logtrack/actions/workflows/ci.yml/badge.svg)](https://github.com/kdiehl/logtrack/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kdiehl_logtrack&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kdiehl_logtrack)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kdiehl_logtrack&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kdiehl_logtrack)
</div>


Logtrack is a web application designed to help users manage and track their time efficiently. This project is built
using React, TypeScript, and Dexie for IndexedDB management.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **⏱️ Time Tracking**: Track time spent on various tasks.
- **📝 Task Management**: Create, update, and delete tasks.
- **📊 Reports**: Generate reports based on tracked time. (coming soon)
- **🌙 Dark Mode**: Switch between light and dark themes.
- **📶 Offline Support**: Works offline using IndexedDB and Workbox.
- **📦 Precaching**: Automatically cache assets during the service worker installation.
-

## 🛠️ Installation

To get started with the Time Tracker application, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/kdiehl/logtrack.git
   cd logtrack
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm start
   ```

## 🚀 Usage

Once the development server is running, you can access the application at `http://localhost:3000`. The main features
include:

- **📊 Dashboard**: View an overview of your tasks and time tracked.
- **📝 Tasks**: Manage your tasks, including adding, editing, and deleting tasks.
- **📈 Reports**: Generate and view reports based on your tracked time.

## 🧪 Testing

This project uses Jest and React Testing Library for unit and integration tests. To run the tests, use the following
command:

```sh
npm test
```

For continuous integration testing, use:

```sh
npm run test:ci
```

## 🤝 Contributing

We welcome contributions to the Time Tracker project. To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```sh
   git commit -m "Add your commit message"
   ```
5. **Push to the branch**:
   ```sh
   git push origin feature/your-feature-name
   ```
6. **Create a pull request**.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using Time Tracker! If you have any questions or feedback, please feel free to open an issue on GitHub.
