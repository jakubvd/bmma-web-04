document.addEventListener("DOMContentLoaded", function () {
    // --- Helper to load the YouTube IFrame API (if needed) ---
    let youtubeAPILoaded = false;
    let youtubeAPIReady = false;
    function loadYouTubeAPI(callback) {
      if (youtubeAPIReady) {
        callback();
      } else {
        if (!youtubeAPILoaded) {
          youtubeAPILoaded = true;
          var tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        // Called by the API once it is ready:
        window.onYouTubeIframeAPIReady = function() {
          youtubeAPIReady = true;
          callback();
        };
      }
    }
  
    // --- Process each video container ---
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
      const videoId = videoContainer.getAttribute("data-video-id");
      const playButton = videoContainer.querySelector(".yt-custom-play-button");
  
      // List of video IDs that should show related videos (from the same channel)
      const showMoreVideos = [
        "xAKqXcG3b7k", // OSTATNI ODCINEK Z ŹYCIA BZIKA
        "wF2eobbOGrs", // jak wyjść z balachy ?
        "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
        "7gv8e54TxdU"  // PRZEGRAŁEM
      ];
  
      // Check if this video is one that should show recommendations.
      const isShowMoreVideo = showMoreVideos.includes(videoId);
  
      function loadVideo() {
        // Clear out the container (removing thumbnail, play button, etc.)
        videoContainer.innerHTML = "";
  
        if (isShowMoreVideo) {
          // --- For the specified videos, load a plain iframe.
          // When the video ends, YouTube will show related videos (from the same channel) because of rel=0.
          const iframe = document.createElement("iframe");
          iframe.className = "yt-lazy-iframe";
          iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
          iframe.title = "YouTube video player";
          iframe.frameBorder = "0";
          iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
          iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
          iframe.setAttribute("allowfullscreen", "");
          videoContainer.appendChild(iframe);
        } else {
          // --- For all other videos, use the YouTube IFrame API.
          // This lets us detect when the video ends so we can remove the player and hide recommendations.
          loadYouTubeAPI(function () {
            // Create a unique div ID for the player.
            const playerDivId = "yt-player-" + videoId + "-" + Math.floor(Math.random() * 10000);
            const playerDiv = document.createElement("div");
            playerDiv.id = playerDivId;
            videoContainer.appendChild(playerDiv);
  
            new YT.Player(playerDivId, {
              videoId: videoId,
              playerVars: {
                autoplay: 1,
                rel: 0, // Still set rel=0 (though YouTube’s default now limits suggestions to the same channel)
                modestbranding: 1,
                controls: 1,
                showinfo: 0,
                fs: 0,
                iv_load_policy: 3,
                disablekb: 1
              },
              events: {
                onStateChange: function (event) {
                  // When the video ends, remove the player to avoid showing any recommendations.
                  if (event.data === YT.PlayerState.ENDED) {
                    videoContainer.innerHTML = "";
                  }
                }
              }
            });
          });
        }
      }
  
      // Attach the event listener to the play button.
      playButton.addEventListener("click", loadVideo);
    });
  });