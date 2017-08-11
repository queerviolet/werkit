export default () => 
<Workshop name="Juke 3. Forms (2.1)" description="Use your functional programming knowledge to compose React components like a true front-end ninja!" artwork={ require('./1478617160915.jpeg') }>
  <Concept name="Intro">
    <Action name="Pre-reading">
      { require('./intro-pre-reading.md') }
    </Action>
    <Action name="Forms & Inputs">
      { require('./intro-forms--inputs.md') }
    </Action>
    <Action name="Goal">
      { require('./intro-goal.md') }
    </Action>
    <Action name="Starting Point">
      { require('./intro-starting-point.md') }
    </Action>
  </Concept>
  <Concept name="Artist Filter">
    <Action name="App State vs UI State">
      { require('./artist-filter-app-state-vs-ui-state.md') }
    </Action>
    <Action name="Composition">
      { require('./artist-filter-composition.md') }
    </Action>
    <Action name="FilterableArtists">
      { require('./artist-filter-filterableartists.md') }
    </Action>
    <Action name="SyntheticEvent">
      { require('./artist-filter-syntheticevent.md') }
    </Action>
    <Action name="Guide">
      { require('./artist-filter-guide.md') }
    </Action>
  </Concept>
  <Concept name="New Playlist">
    <Action name="New Playlist Component">
      { require('./new-playlist-new-playlist-component.md') }
    </Action>
    <Action name="New Playlist Container">
      { require('./new-playlist-new-playlist-container.md') }
    </Action>
    <Action name="Controlled Components">
      { require('./new-playlist-controlled-components.md') }
    </Action>
    <Action name="Disable When Invalid">
      { require('./new-playlist-disable-when-invalid.md') }
    </Action>
    <Action name="Validation Warnings">
      { require('./new-playlist-validation-warnings.md') }
    </Action>
    <Action name="Create">
      { require('./new-playlist-create.md') }
    </Action>
  </Concept>
  <Concept name="All Playlists">
    <Action name="The View">
      { require('./all-playlists-the-view.md') }
    </Action>
    <Action name="Loading All Playlists">
      { require('./all-playlists-loading-all-playlists.md') }
    </Action>
  </Concept>
  <Concept name="Single Playlist">
    <Action name="Single Playlist Component">
      { require('./single-playlist-single-playlist-component.md') }
    </Action>
    <Action name="componentWillReceiveProps">
      { require('./single-playlist-componentwillreceiveprops.md') }
    </Action>
    <Action name="Auto Redirect">
      { require('./single-playlist-auto-redirect.md') }
    </Action>
  </Concept>
  <Concept name="Song Adder">
    <Action name="Set up the View">
      { require('./song-adder-set-up-the-view.md') }
    </Action>
    <Action name="Manage State and Behavior">
      { require('./song-adder-manage-state-and-behavior.md') }
    </Action>
    <Action name="Dealing with Server Errors">
      { require('./song-adder-dealing-with-server-errors.md') }
    </Action>
  </Concept>
  <Concept name="Bonus">
    <Action name="Song Removal">
      { require('./bonus-song-removal.md') }
    </Action>
    <Action name="Typeahead">
      { require('./bonus-typeahead.md') }
    </Action>
    <Action name="Orderable">
      { require('./bonus-orderable.md') }
    </Action>
  </Concept>
  <Concept name="Outro">
    <Action name="Epilogue">
      { require('./outro-epilogue.md') }
    </Action>
  </Concept>
</Workshop>