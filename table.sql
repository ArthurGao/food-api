CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE food (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT
);