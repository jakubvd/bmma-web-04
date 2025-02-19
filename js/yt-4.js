document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        // List of video IDs from the Business Owner's channel (SHOW related videos from the same channel)
        const businessOwnerVideos = [
            "xAKqXcG3b7k", // OSTATNI ODCINEK Z ŹYCIA BZIKA
            "wF2eobbOGrs", // jak wyjść z balachy ?
            "VnyozbCzU6s", // Oficjalne OŚWIADCZENIE (Q&A)
            "7gv8e54TxdU" // PRZEGRAŁEM
        ];

        // Check if the video belongs to the business owner
        const isBusinessOwnerVideo = businessOwnerVideos.includes(videoId);

        // Set rel=0 for business owner videos, and completely disable related videos for media videos
        const relValue = isBusinessOwnerVideo ? "0" : "0";
        const extraParams = isBusinessOwnerVideo ? "" : "&controls=1&modestbranding=1&showinfo=0&fs=0&iv_load_policy=3&disablekb=1";

        function loadVideo() {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("class", "yt-lazy-iframe");
            iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=${relValue}${extraParams}`);
            iframe.setAttribute("title", "YouTube video player");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");

            // Remove the thumbnail and play button
            if (thumbnailWrapper) thumbnailWrapper.remove();
            if (playButton) playButton.remove();

            // Append the iframe
            videoContainer.appendChild(iframe);
        }

        // Attach event listener for user interaction
        playButton.addEventListener("click", loadVideo);
    });
});