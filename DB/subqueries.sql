-- get User details for a passenger

select name, age, address from Users where user_id in (
    select user_id from Passengers where trip_id = 1);

-- get seating deatils of a passenger

select coach, seat_no, status from Ticket where pid in (
     select pid from Passengers where trip_id = 1 and user_id = 6
);

-- but name nahi aa raha
-- name getting w/o subquery

select t.pid,name,coach,seat_no,t.status from Ticket as t, Passengers as p, Users as u
where t.pid = p.pid and u.user_id = p.user_id;
