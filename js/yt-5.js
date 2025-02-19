document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // List of video IDs that should show related videos from the same channel
        const showMoreVideos = [
            "xAKqXcG3b7k", // OSTATNI ODCINEK Z ŹYCIA BZIKA
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU"  // PRZEGRAŁEM
        ];

        // Check if the video should show related videos from the same channel
        const isShowMoreVideo = showMoreVideos.includes(videoId);

        // Set parameters based on whether the video is in the list or not
        const relValue = isShowMoreVideo ? "0" : "0";
        const extraParams = isShowMoreVideo 
            ? "" 
            : "&controls=1&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1";

        function loadVideo() {
            // Remove existing iframe to prevent duplicates
            videoContainer.innerHTML = "";

            // Create a new iframe
            const iframe = document.createElement("iframe");
            iframe.setAttribute("class", "yt-lazy-iframe");
            iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}&playsinline=1`);
            iframe.setAttribute("title", "YouTube video player");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");

            // Ensure correct scaling inside parent div
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.objectFit = "contain"; // Ensures the video scales properly

            // Append the iframe inside the container
            videoContainer.appendChild(iframe);

            // **Trick to Hide Recommendations for Non-Listed Videos**
            if (!isShowMoreVideo) {
                setTimeout(() => {
                    iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                    iframe.contentWindow.postMessage('{"event":"command","func":"hidePopups","args":""}', '*');
                }, 2000); // Slight delay ensures commands execute after load
            }
        }

        // Attach event listener to the play button to load the video on click
        playButton.addEventListener("click", loadVideo);
    });
});