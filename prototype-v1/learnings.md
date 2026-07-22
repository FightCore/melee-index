# Prototype V1 learnings

After a year of working on MeleeIndex, I'm deciding to retire this prototype.
While I really like where this project is going, the overhead of maintaining is just too much.
Admitting, this is already v2 of this project instead of v1, but that version is fully gone.

As a TL;DR, I was too ambitious with this and think I can rewrite this quicker than I can fix it.

## Content Management System was smart, but keep your data your own

I think introducing a CMS was a great move and really saved me a lot of time.
I've previously tried doing this kind of stuff myself but its a rather hopeless adventure.
Making a CMS is too difficult for a hobby project.

The one regret I instantly got was tying my database and API to match the CMS.
While the overall output is good, this makes it incredibly hard when you want to introduce a new way of inputting data.
I tried to perform a migration during a too busy time for myself, using AI messed it up further.

The combination of the half-migrated state together with the scoping back of the project makes me hesitant to use this

## Component library issues

PrimeNG wanting to get more money and going full commercial closed source was a bit of a surprise.
I really appreciate what they have done and even put some of my own money into there (very lacklustre) theme designer.
Now needing to search for something else makes me somewhat think about designing my own components,
but if I'm honest. I don't think I'm a good enough FE dev for that.
I might give it a go with a lightweight framework that only powers the logic.

## Scope creep

The scope was too large for me to handle, people wanted a simple way to organize links and I extended this too far.
Working on a login system, bookmarking, blogging, literally rebuilding the entirety of Fightcore into it.
Just not a good move on my part.

## Final thoughts

I am happy I did this and learned a lot during this time.
I can hopefully now focus on a better start of the fundamentals of the project.
Hopefully in the coming days there will be a new beautiful prototype ready to try out.
