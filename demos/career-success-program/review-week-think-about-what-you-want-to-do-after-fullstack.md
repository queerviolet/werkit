Let's spend a few minutes to start thinking about life _after_ Fullstack.

There are three main career paths that are available to you after you graduate from the immersive program:

<center>
![screenshot](http://content.screencast.com/users/markdavisDML/folders/Snagit/media/85778cad-14cd-48d1-ac2c-29a54ebfa074/2016-11-29_15-19-51.png)
</center>

Let's take a look at each one.

__Fellowship__

Some of you might want to become a fellow for the Fullstack immersive program.

Fellows stay on for a full 13 weeks (junior and senior phase) and get experience mentoring students, helping with the admissions process, and working on projects for the engineering team.  This is a paid role.

Three weeks before the fellowship ends, senior fellows start working with the Career Success team and start applying for jobs.

In week 3 of the Senior Phase, you'll attend a talk where you'll get details on how the Fellowship program works, and will receive instructions on how to apply (if you're interested). 


__Fund__

Do you dream of launching your own startup, and have a great idea for a product or service?  

If so, then you might want to apply for seed funding from our accelerator program, Fullstack Fund, which is available exclusively to graduates of the Fullstack immersive program.  You can read more about this program here: http://www.fullstackacademy.com/fullstack-fund  


__Flight__

While some graduates go on to become fellows and/or launch a startup, the vast majority of students go down the third path, which means participating in the "Flight" program to pursue your dream job as a software engineer.

As a full-stack developer, what are the career options in front of you?  Here are some common examples:

1) Get hired as a developer in a major tech hub, such as New York City, SF or Chicago<br>
2) Get hired as a developer in another location<br>
3) Get hired as a remote developer<br>
4) Get hired as a remote developer, traveling the world as a ["digital nomad"](https://nomadlist.com/)

<hr>

OK, so those are the main options ahead of you after you graduate -- become a fellow, launch a startup, or get hired as a software engineer.  

__Feeling slightly overwhelmed by all the options?  Well don't worry!__  

You don't need to make _any_ decisions right now.  

We just wanted to lay out all the options that will be in front of you. We'll be discussing them in more detail in the weeks ahead.

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