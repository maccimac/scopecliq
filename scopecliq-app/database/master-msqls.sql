-- Create a database if it doesn't exist
USE master;
GO
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'YourDatabaseName')
CREATE DATABASE YourDatabaseName;
GO
USE YourDatabaseName;
GO

-- Create the 'deliverables' table
CREATE TABLE deliverables (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  project_id BIGINT NOT NULL,
  milestone_id BIGINT NOT NULL,
  position INT NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'not_started',
  datetime_started DATETIME,
  datetime_completed DATETIME,
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Create the 'logs' table
CREATE TABLE logs (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  created_at DATETIME,
  updated_at DATETIME,
  project_id BIGINT NOT NULL,
  milestone_id BIGINT,
  deliverable_id BIGINT,
  type VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  description TEXT,
  extra TEXT
);
GO

-- Create the 'milestones' table
CREATE TABLE milestones (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  project_id BIGINT NOT NULL,
  position INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget_percentage INT NOT NULL,
  status_completion VARCHAR(255),
  status_invoice VARCHAR(255),
  datetime_started DATETIME,
  datetime_completed DATETIME,
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Create the 'notifications' table
CREATE TABLE notifications (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  receiver_type INT NOT NULL DEFAULT 0,
  project_id BIGINT NOT NULL,
  milestone_id BIGINT,
  deliverable_id BIGINT,
  type VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  description TEXT,
  extra TEXT,
  client_read_at DATETIME,
  consultant_read_at DATETIME,
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Create the 'organizations' table
CREATE TABLE organizations (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  organization_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_about TEXT NOT NULL,
  organization_logo VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Create the 'projects' table
CREATE TABLE projects (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  user_id BIGINT,
  organization_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  about TEXT NOT NULL,
  budget DECIMAL(8, 2) NOT NULL,
  status VARCHAR(255) NOT NULL,
  portal_domain VARCHAR(255) NOT NULL,
  portal_password VARCHAR(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Create the 'users' table
CREATE TABLE users (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  email_verified_at DATETIME,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100),
  about VARCHAR(255) NOT NULL,
  contact_number VARCHAR(255) NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);
GO

-- Add foreign key constraints
ALTER TABLE deliverables
ADD CONSTRAINT FK_deliverables_milestone FOREIGN KEY (milestone_id) REFERENCES milestones(id);

ALTER TABLE deliverables
ADD CONSTRAINT FK_deliverables_project FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE logs
ADD CONSTRAINT FK_logs_project FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE logs
ADD CONSTRAINT FK_logs_milestone FOREIGN KEY (milestone_id) REFERENCES milestones(id);

ALTER TABLE logs
ADD CONSTRAINT FK_logs_deliverable FOREIGN KEY (deliverable_id) REFERENCES deliverables(id);

ALTER TABLE milestones
ADD CONSTRAINT FK_milestones_project FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE notifications
ADD CONSTRAINT FK_notifications_project FOREIGN KEY (project_id) REFERENCES projects(id);

ALTER TABLE notifications
ADD CONSTRAINT FK_notifications_milestone FOREIGN KEY (milestone_id) REFERENCES milestones(id);

ALTER TABLE notifications
ADD CONSTRAINT FK_notifications_deliverable FOREIGN KEY (deliverable_id) REFERENCES deliverables(id);

ALTER TABLE organizations
ADD CONSTRAINT UQ_organizations_contact_email UNIQUE (contact_email);

ALTER TABLE projects
ADD CONSTRAINT FK_projects_user FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE projects
ADD CONSTRAINT FK_projects_organization FOREIGN KEY (organization_id) REFERENCES organizations(id);