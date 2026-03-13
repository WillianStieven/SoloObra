-- ==========================================================
-- ESTRUTURA DA BASE DE DADOS SOLOOBRA (MVP)
-- Responsável: Erik (Data Model Architect)
-- ==========================================================

-- 1. CRIAÇÃO DAS TABELAS (Schema)
-- ----------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL, -- 'cliente', 'dono', 'operador'
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cpf_cnpj VARCHAR(20),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS machine (
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    tipo_maquina VARCHAR(100),
    description TEXT,
    localizacao VARCHAR(150),
    price_per_hour DECIMAL(10,2) NOT NULL,
    imagem_url VARCHAR(255),
    disponivel BOOLEAN DEFAULT TRUE,
    especificacoes JSONB,
    recursos JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS booking (
    id SERIAL PRIMARY KEY,
    machine_id INT NOT NULL,
    user_id INT NOT NULL,
    data_reserva DATE NOT NULL,
    horas_contratadas INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    taxa_plataforma DECIMAL(10,2) NOT NULL,
    metodo_pagamento VARCHAR(50), 
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_machine FOREIGN KEY (machine_id) REFERENCES machine(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    texto TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_remetente FOREIGN KEY (remetente_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_destinatario FOREIGN KEY (destinatario_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------
-- 2. POVOAMENTO DE DADOS (Inserts para teste)
-- ----------------------------------------------------------

-- Inserindo Usuários (Senhas em texto simples para teste do MVP)
INSERT INTO users (tipo, name, email, password, cidade, estado) VALUES
('dono', 'Ricardo Silva', 'ricardo@email.com', '123456', 'Chapecó', 'SC'),
('cliente', 'Erik Oliveira', 'erik@email.com', 'senha123', 'Chapecó', 'SC'),
('operador', 'João Tratorista', 'joao@email.com', 'operador123', 'Xanxerê', 'SC');

-- Inserindo Máquinas (Relacionadas ao Ricardo - owner_id: 1)
INSERT INTO machine (owner_id, name, tipo_maquina, description, localizacao, price_per_hour, especificacoes, recursos) VALUES
(1, 'Retroescavadeira JCB 3CX', 'Retroescavadeira', 'Máquina potente para escavação e carga.', 'Centro, Chapecó', 350.00, '["Peso: 8 Ton", "Potência: 92hp"]', '["Ar Condicionado", "Operador Incluso"]'),
(1, 'Mini Escavadeira Bobcat E26', 'Escavadeira', 'Ideal para espaços reduzidos e jardinagem.', 'Efapi, Chapecó', 220.00, '["Peso: 2.6 Ton", "Profundidade: 2.5m"]', '["Engate Rápido"]'),
(1, 'Pá Carregadeira Caterpillar 938K', 'Pá Carregadeira', 'Alta produtividade para grandes volumes.', 'Distrito Industrial, Chapecó', 480.00, '["Peso: 15 Ton", "Cacamba: 3m³"]', '["Cabine Fechada", "Câmera de Ré"]');

-- Inserindo uma Reserva de Exemplo (Erik alugando a JCB - machine_id: 1, user_id: 2)
INSERT INTO booking (machine_id, user_id, data_reserva, horas_contratadas, valor_total, taxa_plataforma, metodo_pagamento, status) VALUES
(1, 2, '2026-03-20', 4, 1540.00, 140.00, 'pix', 'approved');

-- Inserindo uma Mensagem no Chat
INSERT INTO message (remetente_id, destinatario_id, texto) VALUES
(2, 1, 'Olá Ricardo, a Retroescavadeira está disponível para sexta-feira?');