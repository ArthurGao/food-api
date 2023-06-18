CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop any existing table and index with the same name
DROP TABLE IF EXISTS food;

-- Create the food table
CREATE TABLE food (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_title ON food (title);