document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".yt-lazy-container").forEach(function (videoContainer) {
        const videoId = videoContainer.getAttribute("data-video-id");
        const thumbnailWrapper = videoContainer.querySelector(".yt-thumbnail-placeholder");
        const playButton = videoContainer.querySelector(".yt-custom-play-button");

        function loadVideo() {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("class", "yt-lazy-iframe");
            iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`); // Ensures related videos are from the same channel
            iframe.setAttribute("title", "YouTube video player");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");

            // Clear only the thumbnail and play button, keep the container
            thumbnailWrapper.remove();
            playButton.remove();

            // Append the iframe
            videoContainer.appendChild(iframe);
        }

        // Attach event listener for user interaction
        playButton.addEventListener("click", loadVideo);
    });
});