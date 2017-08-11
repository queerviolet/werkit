<style>
.example-btn {
  background-image: linear-gradient(#484e55, #3a3f44 60%, #313539);
  background-repeat: no-repeat;
  border-color: rgba(0, 0, 0, 0.6);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  color: #ffffff;
  background-color: #3a3f44;
}
.example-btn:hover {
  background-image: linear-gradient(#020202, #101112 40%, #191b1d);
  background-color: #232628;
}
</style>

Add a <button class="btn example-btn"><i class="fa fa-remove"></i></button> to each song in a playlist. Wire this up so clicking it will remove that song from that playlist.