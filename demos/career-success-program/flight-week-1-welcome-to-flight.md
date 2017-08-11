Wow.  You did it.  Amazing.

You have just completed the immersive program at Fullstack Academy, the top-ranked coding school in the country.  Let's just take a moment and put that into perspective.

First of all, you got *accepted* into the program.  That alone is an impressive feat.  Our admission rate is less than 10%, which makes Fullstack Academy harder to get into than many Ivy League schools. 

Then you survived the *grueling* Junior Phase.  If you're like most of our graduates, you felt pretty overwhelmed through most of it.  But you hung in there, and made it into the Senior Phase.

That's when you went into "maker mode" and used your hard-earned coding skills to build four cool projects.  

And now you have graduated, as a __for real__ fullstack web developer. 

Many of our graduates say two things after they complete the program:

 - That was the quite possibly the hardest thing I've ever done 

 - I made so many new friends, and feel like we'll be friends for life

Do you agree?

Well done : ) 

----

But now is not the time to take our foot off the gas.  It's time to begin the Flight program, where you'll capitalize on all your hard work over the last 17 weeks and land your first job as a software engineer.  

The rest of the workshop will walk you through this process, step-by-step each week.  

So let's get started!


<br><br>

<script>
$(document).ready(function () {
  var actionId = angular.element('#checks').scope().action._id;
  function _getCheck (n) {
    var stored = localStorage.getItem(actionId + '_checkmark_' + n);
    if (!stored) return false;
    return stored == 'complete' ? true : false;
  }
  function _setCheck (n, bool) {
    var toStore;
    if (bool) toStore = 'complete';
    else toStore = 'incomplete';
    localStorage.setItem(actionId + '_checkmark_' + n, toStore);
  }
  $('[type="checkbox"]')
  .each(function (idx, elem) {
    var $elem = $(elem);
    $elem.prop('checked', _getCheck(idx));
    $elem.on('change', function () {
      _setCheck(idx, $elem.prop('checked'));
    });
  });
});
</script>

<p id="checks" class="list-reset career-success-checkbox">
  <div>
    <input type="checkbox">
    <span>Mark this page as complete</span>
  </div>
</p>