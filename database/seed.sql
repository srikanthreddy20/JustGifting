-- Demo data matching the frontend sample data.
insert into gift_pages (slug, nickname, age_range, occasion, interests, budget_inr, description, published)
values ('mayas-30th', 'Maya', '25-34', '30th Birthday', '{coffee,art}', 15000, 'Organised by Sarah', false);

insert into gifts (page_id, title, target_price_inr, category, priority, shop_name)
select id, v.title, v.price, v.cat, v.pri, v.shop from gift_pages,
(values ('Artisan Ceramic Pour-Over Coffee Set', 4500, 'Art & Craft', 1, 'Blue Studio Artisans, Indiranagar'),
        ('Professional Botanical Watercolor Kit', 8200, 'Art & Craft', 2, 'Kala Arts & Crafts, Brigade Road'),
        ('Conical Burr Coffee Grinder', 12000, 'Coffee & Brews', 3, 'Blue Tokai Roasters'),
        ('Masterclass Cookbook Edition', 3200, 'Local Artisans', 4, 'Bookworm, Church Street'),
        ('Smart Indoor Herb Garden', 5000, 'Local Artisans', 5, 'Green Nook, Jayanagar')) as v(title, price, cat, pri, shop)
where slug = 'mayas-30th';

insert into pledges (gift_id, contributor_name, amount_inr, message)
select g.id, v.name, v.amount, v.msg from gifts g join
(values ('Conical Burr Coffee Grinder', 'Rahul Kapoor', 2500, 'Happy birthday Maya!'),
        ('Artisan Ceramic Pour-Over Coffee Set', 'Anonymous', 4500, 'Enjoy your morning brews!'),
        ('Smart Indoor Herb Garden', 'Priya Sharma', 2800, ''),
        ('Conical Burr Coffee Grinder', 'Vikram Nair', 5500, ''),
        ('Masterclass Cookbook Edition', 'Neha Joshi', 3200, 'Cook something amazing!')) as v(title, name, amount, msg)
on g.title = v.title;
