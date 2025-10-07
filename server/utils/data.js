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
        name: "Dryer 202",
        location: "Room A2",
        type: "dryer",
        maintenance: 1,
        resevable: true,
        identifier: "01",
    },
    {
        name: "Dryer 202",
        location: "Room A2",
        type: "dryer",
        maintenance: 1,
        resevable: true,
        identifier: "02",
    },
    {
        name: "Washer 202",
        location: "Room A2",
        type: "washing machine",
        maintenance: 1,
        resevable: true,
        identifier: "01",
    },
    {
        name: "Washer 202",
        location: "Room A2",
        type: "washing machine",
        maintenance: 1,
        resevable: true,
        identifier: "02",
    },
];
const spaces = [
    {
        identifier: "01",
        location: "Building D 1",
        type: "clubroom",
        maintenance: 0,
        reservable: true,
        description: "Spacious room for events",
    },
    {
        identifier: "02",
        location: "Building B 3",
        type: "sauna",
        maintenance: 2,
        reservable: true,
        description: "4 person max",
    }
];
const reservations = [
    {
        reserved_type: "Item",
        start: new Date("2025-10-10T10:00:00Z"),
        end: new Date("2025-10-10T11:00:00Z"),
    },
    {
        reserved_type: "Space",
        start: new Date("2025-10-12T14:00:00Z"),
        end: new Date("2025-10-12T16:00:00Z"),
    },
]

module.exports = { users, markets, items, spaces, reservations };
