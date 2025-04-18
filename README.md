# 📊 Social Media Analytics HTTP Microservice

This project is a lightweight HTTP microservice that provides **real-time analytical insights** from a social media platform's test API. It enables business users to access top user engagement metrics, such as the most commented posts and the most active users.

---

## 🚀 Features

- 🔝 **Top Users**: Get the top 5 users based on the number of comments on their posts.
- 📰 **Popular Posts**: Retrieve posts with the highest number of comments.
- 🆕 **Latest Posts**: Fetch the 5 most recent posts in real-time.
- ⚡ Efficient data aggregation even when data is unsorted or large in volume.
- 🔐 No login/registration required – for internal analytics purposes.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Axios** (for API consumption)
- Optional future integrations: **Redis** for caching, **Docker** for containerization

---

## 📌 API Endpoints

### 🔝 GET `/users`

**Description:** Returns the top 5 users whose posts have the highest total number of comments.

**Response:**
```json
[
  {
    "userId": 1,
    "username": "john_doe",
    "totalComments": 158
  },
  {
    "userId": 2,
    "username": "jane_smith",
    "totalComments": 149
  },
  
]
```


# Clone the repository
git clone https://github.com/your-username/social-media-analytics-service.git
cd social-media-analytics-service

# Install dependencies
npm install

# Start the server
npm start
