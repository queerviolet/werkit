Keep these notes in "Draft Mode" so only Instructors / Fellows can see them.

Just wanting to keep a list of most asked questions/major difficulties, so that everyone can be adequately prepared.

 - The need for `valueOf` in the Linked Lists portion of the workshop is no longer necessary, but still in the review video, so you might need to explain this.
 - Questions about good size of buckets for a hash table.
	- Note that a good hashing function is also key!
	- A good rule of the thumb (not always ideal though) is to re-hash if the hashtable is filled up to 80%. That means if you have 100 buckets and 80 items inside, regardless how many collision you had before, it's getting time to increase capacity. Sourced [here](http://stackoverflow.com/questions/225621/how-many-hash-buckets), and I saw something similar in other places.