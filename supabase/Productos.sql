-- =====================================================================
-- Mates_Oliver - Script de la tabla productos
-- Se corre UNA sola vez en Supabase: SQL Editor -> New query -> Run.
-- =====================================================================

-- 1) Columnas nuevas. Las necesita la tienda para armar la ficha de
--    cada producto (especialidad, color y foto grande del visor).
--    "if not exists" evita el error si ya estaban creadas.
alter table productos add column if not exists especialidad text;
alter table productos add column if not exists color text;
alter table productos add column if not exists foto_grande text;

-- 2) Politica de RLS para BORRAR desde el panel de administrador.
--    Ya existen la de SELECT (leer) y la de INSERT (guardar).
--    Leer, guardar y borrar son permisos distintos: cada uno lleva la suya.
drop policy if exists "Borrar productos desde el panel" on productos;
create policy "Borrar productos desde el panel"
  on productos for delete
  to anon
  using (true);

-- 3) Bucket PUBLICO de Storage para subir fotos nuevas desde Supabase.
--    Cada foto subida tiene una URL publica que se pega en el admin.
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

-- 4) Carga automatica de todo el catalogo que estaba escrito en index.html.
--    Los precios de yerbas y termos son de ejemplo: se cambian desde
--    Supabase (Table Editor) cuando quieras.
insert into productos
  (nombre, categoria, descripcion, precio_lista, precio_final, stock, foto, foto_grande, especialidad, color)
values
  ('Mate Paracaidista claro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mata-paracaidista-claro.jpeg', 'fotos/mate-paracaidista-claro-grande.png', 'Paracaidista', 'Claro'),
  ('Mate Asalto Aereo', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-asalto-aereo.jpeg', 'fotos/mate-asalto-aereo-grande.png', 'Asalto Aéreo', 'Natural'),
  ('Mate Cazador de Montaña claro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-cazador-de-montana-claro.jpeg', 'fotos/mate-cazador-de-montana-claro-grande.png', 'Cazador de Montaña', 'Claro'),
  ('Mate Cazador de Montaña negro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-cazador-de-montana-negro.jpeg', 'fotos/mate-cazador-de-montana-negro-grande.png', 'Cazador de Montaña', 'Negro'),
  ('Mate Cazador de Monte Claro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-cazador-de-monte-claro.jpeg', 'fotos/mate-cazador-de-monte-claro-grande.png', 'Cazador de Monte', 'Claro'),
  ('Mate Cazador de Monte Negro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-cazador-de-monte-negro.jpeg', 'fotos/mate-cazador-de-monte-negro-grande.png', 'Cazador de Monte', 'Negro'),
  ('Mate Comando claro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-comando-claro.jpeg', 'fotos/mate-comando-claro-grande.png', 'Comando', 'Claro'),
  ('Mate Monte claro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-monte-claro.jpeg', 'fotos/mate-monte-claro-grande.png', 'Monte', 'Claro'),
  ('Mate Monte negro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-monte-negro.jpeg', 'fotos/mate-monte-negro-grande.png', 'Monte', 'Negro'),
  ('Mate Paracaidista Oscuro', 'mates-madera', 'Madera de cedro · Virola de alpaca · Escudo personalizado', 85000, 68000, 10, 'fotos/mate-paracaidista-oscuro.jpeg', 'fotos/mate-paracaidista-oscuro-grande.png', 'Paracaidista', 'Oscuro'),
  ('Bombilla Alpaca Caballeria', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-caballeria.jpeg', 'fotos/bombilla-alpaca-caballeria-grande.png', 'Caballería', null),
  ('Bombilla Alpaca Comando', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-comando.jpeg', 'fotos/bombilla-alpaca-comando-grande.png', 'Comando', null),
  ('Bombilla Alpaca Comando 2', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-comando-2.jpeg', 'fotos/bombilla-alpaca-comando-2-grande.png', 'Comando', null),
  ('Bombilla Alpaca FFEE', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-ffee.jpeg', 'fotos/bombilla-alpaca-ffee-grande.png', 'Fuerzas Especiales', null),
  ('Bombilla Alpaca Intendencia', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-intendencia.jpeg', 'fotos/bombilla-alpaca-intendencia-grande.png', 'Intendencia', null),
  ('Bombilla Alpaca asalto aereo', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-asalto-aereo.jpeg', 'fotos/bombilla-alpaca-asalto-aereo-grande.png', 'Asalto Aéreo', null),
  ('Bombilla Alpaca cazador de Montaña', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-cazador-de-montana.jpeg', 'fotos/bombilla-alpaca-cazador-de-montana-grande.png', 'Cazador de Montaña', null),
  ('Bombilla Alpaca cazador patagonico', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-cazador-patagonico.jpeg', 'fotos/bombilla-alpaca-cazador-patagonico-grande.png', 'Cazador Patagónico', null),
  ('Bombilla Alpaca educacion fisica', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-educacion-fisica.jpeg', 'fotos/bombilla-alpaca-educacion-fisica-grande.png', 'Educación Física', null),
  ('Bombilla Alpaca paracaidista', 'bombillas-alpaca', 'Alpaca pulida · Escudo institucional · Filtro para yerba', 65000, 55000, 10, 'fotos/bombilla-alpaca-paracaidista.jpeg', 'fotos/bombilla-alpaca-paracaidista-grande.png', 'Paracaidista', null),
  ('Yerba Canarias', 'yerbas', 'Yerba mate elaborada con palo', 9500, 8500, 10, 'fotos/yerba-canarias.jpeg', 'fotos/yerba-canarias-grande.jpeg', 'Canarias', null),
  ('Yerba Verdeflor', 'yerbas', 'Yerba mate elaborada con palo', 8000, 7200, 10, 'fotos/yerba-verdeflor.jpeg', 'fotos/yerba-verdeflor-grande.jpeg', 'Verdeflor', null),
  ('Yerba Rosamonte', 'yerbas', 'Yerba mate elaborada con palo', 8500, 7600, 10, 'fotos/yerba-rosamonte.jpeg', 'fotos/yerba-rosamonte-grande.jpeg', 'Rosamonte', null),
  ('Yerba Playadito', 'yerbas', 'Yerba mate elaborada con palo', 9000, 8200, 10, 'fotos/yerba-playadito.jpeg', 'fotos/yerba-playadito-grande.jpeg', 'Playadito', null),
  ('Yerba Cachamate 500 g', 'yerbas', 'Yerba mate elaborada con palo', 5500, 4900, 10, 'fotos/yerba-cachamate-500g.jpg', 'fotos/yerba-cachamate-500g-grande.jpg', 'Cachamate', null),
  ('Yerba La Tranquera 1 kg', 'yerbas', 'Yerba mate elaborada con palo', 8000, 7300, 10, 'fotos/yerba-la-tranquera-1kg.jpg', 'fotos/yerba-la-tranquera-1kg-grande.jpg', 'La Tranquera', null),
  ('Yerba Mate Rojo 1 kg', 'yerbas', 'Yerba mate elaborada con palo', 8500, 7700, 10, 'fotos/yerba-mate-rojo-1kg.jpg', 'fotos/yerba-mate-rojo-1kg-grande.jpg', 'Mate Rojo', null),
  ('Yerba Piporé Suave 500 g', 'yerbas', 'Yerba mate elaborada con palo', 5000, 4500, 10, 'fotos/yerba-pipore-suave-500g.jpg', 'fotos/yerba-pipore-suave-500g-grande.jpg', 'Piporé Suave', null),
  ('Termo Coleman 1,2 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 75000, 62000, 10, 'fotos/termo-coleman.jpeg', 'fotos/termo-coleman-grande.jpeg', 'Coleman', null),
  ('Termo Stanley Negro 1,2 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 140000, 120000, 10, 'fotos/termo-stanley-negro.jpeg', 'fotos/termo-stanley-negro-grande.jpeg', 'Stanley Negro', null),
  ('Termo Stanley Plateado 1,2 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 140000, 120000, 10, 'fotos/termo-stanley-plateado.jpeg', 'fotos/termo-stanley-plateado-grande.jpeg', 'Stanley Plateado', null),
  ('Termo Coleman Negro 1 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 70000, 58000, 10, 'fotos/termo-coleman-negro-1lt.jpeg', 'fotos/termo-coleman-negro-1lt-grande.jpeg', 'Coleman Negro', null),
  ('Termo Hudson 1,2 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 52000, 45000, 10, 'fotos/termo-hudson-1.2lt.jpg', 'fotos/termo-hudson-1.2lt-grande.jpg', 'Hudson', null),
  ('Termo Lumilagro 1,2 L', 'termos', 'Termo de acero inoxidable · Pico cebador', 40000, 35000, 10, 'fotos/termo-lumilagro-1.2lt.jpg', 'fotos/termo-lumilagro-1.2lt-grande.jpg', 'Lumilagro', null),
  ('Termo Contigo', 'termos', 'Termo de acero inoxidable · Pico cebador', 85000, 72000, 10, 'fotos/termo-contigo.jpeg', 'fotos/termo-contigo-grande.jpeg', 'Contigo', null);