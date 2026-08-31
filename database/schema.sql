

CREATE TABLE IF NOT EXISTS crimes (
    id BIGINT PRIMARY KEY,
    case_number VARCHAR(20),
    date TIMESTAMP,
    block VARCHAR(150),
    iucr VARCHAR(20),
    primary_type VARCHAR(100),
    description VARCHAR(255),
    location_description VARCHAR(150),
    arrest BOOLEAN,
    domestic BOOLEAN,
    beat INTEGER,
    district INTEGER,
    ward INTEGER,
    community_area INTEGER,
    fbi_code VARCHAR(20),
    x_coordinate DOUBLE PRECISION,
    y_coordinate DOUBLE PRECISION,
    year INTEGER,
    updated_on TIMESTAMP,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    location VARCHAR(100)
);

-- Indexes for frequently used filters and analytics

CREATE INDEX IF NOT EXISTS idx_crimes_date
ON crimes(date);

CREATE INDEX IF NOT EXISTS idx_crimes_primary_type
ON crimes(primary_type);

CREATE INDEX IF NOT EXISTS idx_crimes_district
ON crimes(district);

CREATE INDEX IF NOT EXISTS idx_crimes_year
ON crimes(year);

CREATE INDEX IF NOT EXISTS idx_crimes_arrest
ON crimes(arrest);

CREATE INDEX IF NOT EXISTS idx_crimes_location
ON crimes(location_description);