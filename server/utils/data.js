const users = [
    {
        name: "Admin",
        email: 'admin@hoas.fi',
        password: "Admin1!",
        status: 2,
    },
    {
        name: "User",
        email: 'user@hoas.fi',
        password: "Juan1!",
        status: 0,
    },
];
const markets = [
    {
        owner_id: "651d2e4c1e2a3c5d7c012345",
        title: "Used Office Chair",
        description: "Ergonomic chair in good condition, slight wear on armrests.",
        price: 120.00,
        createdAt: "2025-10-07T08:15:00.000Z",
        updatedAt: "2025-10-07T08:15:00.000Z"
    },
];
const items = [
    {
        name: "Projector",
        type: "electronic",
        identifier: "PRJ-12345",
        status: 0,
        createdAt: "2025-10-07T08:05:00.000Z",
        updatedAt: "2025-10-07T08:05:00.000Z"
    },
];
const spaces = [
    {
        room_number: "A101",
        type: "conference",
        maintenance: 1,
        description: 2,
        createdAt: "2025-10-07T08:00:00.000Z",
        updatedAt: "2025-10-07T08:00:00.000Z"
    }
];
const reservations = [
    {
        start: "2025-10-08T09:00:00.000Z",
        end: "2025-10-08T10:00:00.000Z",
        createdAt: "2025-10-07T08:10:00.000Z",
        updatedAt: "2025-10-07T08:10:00.000Z"

    },
    {
        start: "2025-10-08T09:00:00.000Z",
        end: "2025-10-08T10:00:00.000Z",
        createdAt: "2025-10-07T08:10:00.000Z",
        updatedAt: "2025-10-07T08:10:00.000Z"

    }

]

module.exports = { users, markets, items, spaces, reservations };
