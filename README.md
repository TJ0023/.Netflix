# .Netflix
Creating a Netflix clone with the use of React, Tailwind CSS, and Firebase for authentication

Not much to say about it as of the moment as I'm tired but I will definitely praise Tailwin CSS with how intuitive
its class descriptions are in making quick designs that are nice and sleek.

I encountered some issues in saving the user's 'Saved Shows' in the user database
that if one were to register their email into the firebase database in varying cases
and not just in lowercase (John@example.com instead of john@example.com) it won't save any information at all
because it's case sensitive.

I resolved that issue by adding the toLowerCase() function within the input values for both the login
and signup to ensure consistent value reads and avoid case sensitive issues from popping of that I know of.

Lastly, I should definitely use Tailwind CSS more. It's definitely more intuitive than bootstrap and 
concise with its class naming which saves a lot of time. 
And thank you to React and Firebase for being awesome!
