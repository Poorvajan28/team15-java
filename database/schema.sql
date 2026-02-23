-- Campus Resource Management System Database Schema
-- PostgreSQL

-- Create database
-- CREATE DATABASE campus_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'STAFF')),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('LAB', 'CLASSROOM', 'EVENT_HALL')),
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_id BIGINT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(resource_id, booking_date, time_slot)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_resource_id ON bookings(resource_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_resources_updated_at ON resources;
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing

-- Insert sample users
INSERT INTO users (name, email, phone, role, status) VALUES 
('John Smith', 'john.smith@campus.edu', '1234567890', 'STAFF', 'ACTIVE'),
('Sarah Johnson', 'sarah.johnson@campus.edu', '1234567891', 'STUDENT', 'ACTIVE'),
('Michael Brown', 'michael.brown@campus.edu', '1234567892', 'STUDENT', 'ACTIVE'),
('Emily Davis', 'emily.davis@campus.edu', '1234567893', 'STAFF', 'ACTIVE'),
('David Wilson', 'david.wilson@campus.edu', '1234567894', 'STUDENT', 'INACTIVE')
ON CONFLICT (email) DO NOTHING;

-- Insert sample resources
INSERT INTO resources (name, type, capacity, status) VALUES
('Computer Lab 101', 'LAB', 30, 'AVAILABLE'),
('Science Lab 201', 'LAB', 25, 'AVAILABLE'),
('Room 101', 'CLASSROOM', 40, 'AVAILABLE'),
('Room 102', 'CLASSROOM', 35, 'AVAILABLE'),
('Room 103', 'CLASSROOM', 50, 'UNAVAILABLE'),
('Main Event Hall', 'EVENT_HALL', 200, 'AVAILABLE'),
('Conference Room A', 'CLASSROOM', 20, 'AVAILABLE')
ON CONFLICT DO NOTHING;

-- Insert sample bookings
INSERT INTO bookings (user_id, resource_id, booking_date, time_slot, status) VALUES
(1, 1, '2024-01-15', '09:00 - 10:00', 'APPROVED'),
(2, 1, '2024-01-15', '10:00 - 11:00', 'PENDING'),
(3, 3, '2024-01-16', '09:00 - 10:00', 'APPROVED'),
(2, 4, '2024-01-16', '11:00 - 12:00', 'PENDING'),
(4, 6, '2024-01-17', '14:00 - 15:00', 'PENDING')
ON CONFLICT (resource_id, booking_date, time_slot) DO NOTHING;
