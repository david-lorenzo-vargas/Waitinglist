implementations:

  - Params on activities URL for selecting between 'bookings' and 'Waiting list' tabs
  - Logic for getting 'Add to waiting list' text in acitivity item button
  - Logic for getting 'Add to waiting list' text in BookNow modal
  - Add new value `waiting: boolean` to Booking interface inside types dir
  - Add new value `waiting: boolean` to fetch body in BookNow component based on isFull prop received which show if the user is trying to book an activity with the activity fully booked
  - Logic added for not getting a number higher than the places available in the activity even if there are people in the waiting list
  - Filter the bookings array based on URL params so if `admin?tab=bookings` we get the bookings where waiting is False and if `admin?tab=waiting-list` we get the bookings where the waiting is True