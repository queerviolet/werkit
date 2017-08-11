You need to submit your student profile and interest statements into the Hiring Day app by Thursday at 5:00 PM.  

The good news is that you'll be able to use much of the same content from your Stack Overflow and LinkedIn profiles in your Hiring Day profile, which will definitely speed up the process.

If you need to refresh your memory about how the Hiring Day app works, here's the demo video one more time:

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/l9mUHv3-0-Y" frameborder="0" allowfullscreen></iframe>
</center>
<br>

Here are some examples of interest statements (in this case, written for Dropbox):

`Before studying and then teaching web development at Fullstack Academy, I managed e-commerce operations for a start-up. When we transferred all company documents from Google Drive to DropBox, I fell in love with the product for its intuitive functionality, cross-device and offline accessibility, and beautiful design. I would be thrilled to join an engineering team working on a product I use every day. Thank you for your consideration!`

`Hi Dropbox. I’m a full stack web developer with a particular interest in back-end and mobile development. I’m impressed by Dropbox Paper, and I think that making collaborative editing even better could pose some interesting challenges (Related feature request: the ability to draw in Paper). In addition to the full stack JavaScript skills I’ve learned at Grace Hopper Academy, I have experience developing Android applications, with a few side projects up in the Play store, and I’d love to speak with you more about how I might be able to contribute to either the Paper web or mobile apps!`

`Prior to Fullstack Academy I was as an application / mechanical engineer in the engineered pump power market. After ~3 years in this position, it was time for me to pursue my interest in computer programming. I would be of value to DropBox because of my computer programming and problem solving skills. My time at Fullstack has laid the groundwork -- now I am eager to get back to work. I am confident I can add value to DropBox, especially considering the challenging environment that DropBox operates in.`

`Dropbox has always been on the front lines of establishing collaboration and cutting edge technologies. When cloud computing was still young, Dropbox was one of the first to reveal the power of the cloud and how to expand horizons of collaboration with their technology. Even to this day, that message is still firmly shown by what Dropbox offers users. As a user of Dropbox, I would love to be part of the team that pushes this technology as well as new and advancing tech. I am excited at the idea of changing the way people collaborate while simplifying technology so people can get more done.`

__So go ahead and write your profile and interest statements, and submit them by Thursday at 5:00 PM!__  

Then mark this task as complete.

The Career Success team will send all interest statements and profiles to employers the following morning.


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