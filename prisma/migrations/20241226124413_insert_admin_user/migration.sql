-- This is an empty migration.
-- Insertar usuario administrador por defecto
INSERT INTO "User" (
    "id",
    "email",
    "password",
    "firstName",
    "lastName",
    "dni",
    "role",
    "phoneNumber",
    "createdAt",
    "updatedAt"
) VALUES (
    '14f8af69-242b-4c87-833b-792f6d3d4d91',
    'admin@admin.com',
    -- Asegúrate de cambiar este hash por uno generado correctamente para tu contraseña
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4oL4ELpzni', -- Contraseña: Admin123!
    'Admin',
    'System',
    '00000000',
    'ADMIN',
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);