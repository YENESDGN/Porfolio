

Project portfolio {

  database_type: 'PostgreSQL'

  Note: 'Kişisel portfolyo sitesi veri modeli'

}

  

// ---------- Ortak ----------

  

Table media {

  id int [pk, increment]

  url varchar(500) [not null]

  alt_text varchar(255)

  created_at timestamp [default: `now()`]

  Note: 'Tüm Fotoğraf blokları buradan beslenir'

}

  

// ---------- LandingPage ----------

  

Table landing_page {

  id int [pk, increment]

  welcome_text text [not null, note: 'Hoşgeldin Yazısı']

  photo_id int [ref: - media.id, note: 'Fotoğraf']

  updated_at timestamp

  Note: '"Projeler + (sayısı)" bloğu projects tablosundan COUNT ile hesaplanır, ayrı kolon gerekmez'

}

  

// ---------- Hakkımda ----------

  

Table about_sections {

  id int [pk, increment]

  content text [not null, note: 'Metin']

  photo_id int [ref: - media.id, note: 'Fotoğraf (opsiyonel)']

  updated_at timestamp

  Note: 'Fotoğraf + Metin çiftleri; sırayla listelenir'

}

// ---------- Projeler ----------

  

Table projects {

  id int [pk, increment]

  title varchar(150) [not null]

  description text [not null, note: 'Metin']

  cover_photo_id int [ref: - media.id, note: 'Fotoğraf']

  github_url varchar(300) [note: 'GitHub Link']

  is_published boolean [default: true]

  created_at timestamp [default: `now()`]

}