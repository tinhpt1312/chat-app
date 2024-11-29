# Chat Box Application

Real-time messaging application with comprehensive features for both web and mobile.

## Key Features

### 1. User Management

- Register, login (email authentication supported)
- Email verification
- Profile updates
- Avatar upload
- Online/offline status management

### 2. Messaging

- One-on-one messaging
- Group messaging
- File attachments
- Message reactions
- Pin important messages
- Message recall
- Message search

### 3. Group Management

- Create chat groups
- Add/remove members
- Admin privileges
- Leave group

### 4. Security Features

- Block users
- Report inappropriate messages/users
- Message content encryption
- Two-factor authentication

### 5. Additional Features

- New message notifications
- Friend management
- View friends' online/offline status

## Technologies Used

### Backend

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- WebSocket (Socket.io)
- JWT Authentication

### Frontend

- React
- TypeScript
- Tailwind CSS
- Socket.io Client

## Database Structure

### Main Tables

1. users - User information management
2. messages - Message storage
3. message_contents - Message content
4. groups - Chat group information
5. group_members - Group membership
6. attachments - File attachments
7. message_reactions - Message reactions
8. notifications - Notifications
9. reports - Violation reports
10. user_blocks - User blocking

## Installation and Setup

### System Requirements

- Node.js >= 14
- PostgreSQL >= 12
- npm or yarn

### Backend Setup

```bash
cd server
npm install
npm run start:dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## API Documentation

API documentation is automatically generated with Swagger UI and can be accessed at:

```
http://localhost:3001/api
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE.md](LICENSE.md) for details

## Contact

Your Name - [@tinhpt1312](https://github.com/tinhpt1312) - tinhpt1312@gmail.com

Project Link: [https://github.com/tinhpt1312/chat-box](https://github.com/tinhpt1312/chat-box)
