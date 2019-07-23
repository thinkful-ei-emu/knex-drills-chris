BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
  ('Northeast1', '2016-01-16 12:00:00',       'Despotato'),
  ('Midwest2 ',  '2016-05-01 15:00:00',       'Shape of Pooh'),
  ('South3',     '2017-02-22 12:00:00',       'UpTown Monk'),
  ('West4',      '2017-04-04 08:00:00',       'Despotato'),
  ('Midwest4 ',  '2017-04-23 15:00:00',       'Despotato'),
  ('Northeast5', '2017-08-11 13:00:00',       'Cats that teach SQL'),
  ('Midwest 6',  '2017-12-09 17:00:00',       'Despotato'),
  ('South7',     '2018-01-24 19:00:00',       'Cats that teach SQL'),
  ('West8',      '2018-01-29 11:00:00',       'Man''s not torrid'),
  ('Northeast9', '2018-02-13 05:00:00',       'UpTown Monk'),
  ('Midwest 10',  '2018-03-13 09:00:00',       'Shape of Pooh'),
  ('South11',     '2018-03-31 13:00:00',       'UpTown Monk'),
  ('Northeast12', '2019-04-03 07:00:00',       'Despotato'),
  ('West13',      '2019-05-05 21:00:00',       'UpTown Monk'),
  ('West14',      now() - '29 days'::INTERVAL, 'Man''s not torrid'),
  ('Northeast15', now() - '29 days'::INTERVAL, 'Despotato'),
  ('Midwest 16',  now() - '29 days'::INTERVAL, 'Cats that teach SQL'),
  ('Northeast17', now() - '29 days'::INTERVAL, 'UpTown Monk'),
  ('Midwest 18',  now() - '29 days'::INTERVAL, 'Despotato'),
  ('West19',      now() - '29 days'::INTERVAL, 'Shape of Pooh'),
  ('Midwest20 ',  now() - '28 days'::INTERVAL, 'Cats that teach SQL'),
  ('Northeast21', now() - '28 days'::INTERVAL, 'UpTown Monk');

  COMMIT;