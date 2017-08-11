We've seen how we can validate and show users errors before they submit the form -- but what if something were to go wrong on our server?

If you add a duplicate song to a playlist, that will cause our server to respond with an error. We could validate this on the front end (and normally, we would), but as an extra challenge let's allow users to do this, and instead catch and display an error just like we did when we validated the length of the new playlist input.

Bonus points if you use some kind of error component that you share with the new playlist form!

<hint title="Some advice">
Is the method that adds the song returning anything? Remember that `axios` requests return a `Promise`!
</hint>

<guide>
An error appears whenever you try to add a duplicate song to a playlist
</guide>