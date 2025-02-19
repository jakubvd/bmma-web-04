document.addEventListener("DOMContentLoaded", function () {
    // --- Helper to load YouTube IFrame API (if needed) ---
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
        // Called by the API once it's ready:
        window.onYouTubeIframeAPIReady = function () {
          youtubeAPIReady = true;
          callback();
        };
      }
    }
  
    // --- Process each video container ---
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
      const videoId = videoContainer.getAttribute("data-video-id");
      const playButton = videoContainer.querySelector(".yt-custom-play-button");
  
      // List of videos that should show related videos (from the same channel)
      const showMoreVideos = [
        "xAKqXcG3b7k", // OSTATNI ODCINEK Z ŹYCIA BZIKA
        "wF2eobbOGrs", // jak wyjść z balachy ?
        "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
        "7gv8e54TxdU"  // PRZEGRAŁEM
      ];
  
      // Check if this video should show related videos
      const isShowMoreVideo = showMoreVideos.includes(videoId);
  
      function loadVideo() {
        // Clear out the container (remove thumbnail, play button, etc.)
        videoContainer.innerHTML = "";
  
        if (isShowMoreVideo) {
          // --- For these videos, load a standard YouTube iframe with rel=0 ---
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
          // --- For all other videos, use the YouTube IFrame API to detect when the video ends ---
          loadYouTubeAPI(function () {
            // Create a unique div ID for the player
            const playerDivId = "yt-player-" + videoId + "-" + Math.floor(Math.random() * 10000);
            const playerDiv = document.createElement("div");
            playerDiv.id = playerDivId;
            videoContainer.appendChild(playerDiv);
  
            new YT.Player(playerDivId, {
              videoId: videoId,
              playerVars: {
                autoplay: 1,
                rel: 0, // Ensures related videos are from the same channel (but this alone doesn't hide them)
                modestbranding: 1,
                controls: 1,
                showinfo: 0,
                fs: 0,
                iv_load_policy: 3,
                disablekb: 1
              },
              events: {
                onStateChange: function (event) {
                  // When the video ends, remove the player so that no "More Videos" overlay appears
                  if (event.data === YT.PlayerState.ENDED) {
                    videoContainer.innerHTML = "";
                  }
                }
              }
            });
          });
        }
      }
  
      // Attach the event listener to the play button
      playButton.addEventListener("click", loadVideo);
    });
  });