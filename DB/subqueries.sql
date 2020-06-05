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

-- Get the eraning and number of passengers on a trip

Select sum(fare) as Earning,count(fare) as TotalCount 
from (Select fare,trip_id from Passengers Natural Join Trips) as EarningTable 
where trip_id = 1;

-- TCs not alloted
Select * from TC WHERE tc_id NOT IN (SELECT tc_id from Trips);

-- Drivers Not alloted
Select * from Drivers WHERE driver_id NOT IN (SELECT driver_id from Trips);